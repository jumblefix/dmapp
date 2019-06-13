import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { isBrowser } from '~utils/utils';
import { errorMessages } from '../utils/common';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function create(initialState: any, { getToken }: Options) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        );

        if (isBrowser && message.includes(errorMessages.loginToContinue)) {
          Router.replace('/login');
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const wsLink = isBrowser
    ? new WebSocketLink({
        uri: `ws://localhost:4000/graphql`,
        options: {
          reconnect: true,
        },
      })
    : null;

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : '',
      },
    };
  });

  const link = wsLink
    ? split(
        // split based on operation type for subscription
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      )
    : httpLink;

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(errorLink.concat(link)),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
