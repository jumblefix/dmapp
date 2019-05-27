import { NextContext } from 'next';
import React from 'react';

interface IAboutProps {
  userAgent: string;
}

class About extends React.Component<IAboutProps> {
  static async getInitialProps({ req }: NextContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>{this.props.userAgent}</p>
      </div>
    );
  }
}

export default About;
