import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import App, { Container, NextAppContext } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import withApollo from '../src/lib/withApollo';
import { AppGlobalStyle } from '../src/utils/globalStyles';
import { appTheme } from '../src/utils/theme';

Router.events.on('routeChangeStart', (url: string) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface NextAppContextExtended extends NextAppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class DmApp extends App<NextAppContextExtended> {
  static async getInitialProps({ Component, ctx }: NextAppContextExtended) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <AppGlobalStyle />
        <ThemeProvider theme={appTheme}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApollo(DmApp);
