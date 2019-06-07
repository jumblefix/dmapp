import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import Header from '../src/components/Header';
import { Button } from '../src/components/ui/Button';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/Demo'),
  {
    ssr: false,
  },
);

interface HomeState {
  text: string;
}

export default class Home extends Component<any, HomeState> {
  state = {
    text: 'Home',
  };

  changeText = () =>
    this.setState(state => {
      if (state.text === 'Home') {
        return { text: 'Hello' };
      }
      return { text: 'Home' };
    });

  render() {
    const { text } = this.state;
    return (
      <div>
        <Header />
        <h1 className="header-text">{text}</h1>
        <Button onClick={this.changeText}>Hello</Button>
        <DynamicComponentWithNoSSR />
      </div>
    );
  }
}
