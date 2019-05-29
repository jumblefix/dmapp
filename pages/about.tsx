import { NextContext } from 'next';
import React from 'react';
import { Title } from '../src/components/ui/Title';

interface AboutProps {
  userAgent: string;
  url: string;
}

const About = ({ userAgent, url }: AboutProps) => (
  <div>
    <h1>Hello World</h1>
    <p>{userAgent}</p>
    <Title>{url}</Title>
    <h2>This is a subtitle here.</h2>
    <p>Welcome to my about us page</p>
    <p>This is an example of page</p>
    <Title>Hello World!</Title>
  </div>
);

About.getInitialProps = async ({ req }: NextContext) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const url = req ? req.headers.host : location.host;
  return { userAgent, url };
};

export default About;
