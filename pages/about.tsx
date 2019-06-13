import React from 'react';
import Header from '../src/components/Header';
import { Title } from '../src/components/ui/Title';
import { MainCategoryComponent } from '../src/generated/generated';
import { MyClientAppContext } from '../src/types/types';

interface AboutProps {
  userAgent: string;
  url: string;
}

const About = ({ userAgent, url }: AboutProps) => (
  <div>
    <Header />
    <h1>Hello World</h1>
    <p>{userAgent}</p>
    <Title>{url}</Title>
    <h2>This is a subtitle here.</h2>
    <p>Welcome to my about us page</p>
    <p>This is an example of page</p>
    <Title>Hello World!</Title>
    <MainCategoryComponent>
      {({ data, error, loading }) => {
        if (loading) {
          return <p>Loading... </p>;
        }

        if (error) {
          return <p>{error}</p>;
        }

        if (data) {
          const { getMainCategory } = data;
          return getMainCategory.map(i => (
            <li key={i.slug}>
              {i.name}
              {i.id}
              {i.slug}
            </li>
          ));
        }
      }}
    </MainCategoryComponent>
  </div>
);

About.getInitialProps = async ({ req }: MyClientAppContext) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const url = req ? req.headers.host : location.host;
  return { userAgent, url };
};

export default About;
