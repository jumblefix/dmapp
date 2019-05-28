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
  </div>
);

About.getInitialProps = async ({ req }: NextContext) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const url = req ? req.headers.host : location.host;
  return { userAgent, url };
};

export default About;
