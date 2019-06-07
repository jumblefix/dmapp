import dynamic from 'next/dynamic';
import React from 'react';
import Header from '../src/components/Header';
import { Button } from '../src/components/ui/Button';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/Demo'),
  {
    ssr: false,
  },
);

export default () => (
  <div>
    <Header />
    <h1>Home</h1>
    <Button>Hello</Button>
    <DynamicComponentWithNoSSR />
  </div>
);
