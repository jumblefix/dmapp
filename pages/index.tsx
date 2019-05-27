import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { Button } from '../src/components/ui/Button';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/Demo'),
  {
    ssr: false,
  },
);

export default () => (
  <div>
    <ul>
      <li>
        <Link href="/about" as="/about">
          <a>about</a>
        </Link>
      </li>
      <li>
        <Link href="/admin" as="/admin">
          <a>admin</a>
        </Link>
      </li>
      <li>
        <Link href="/admin/manage" as="/admin/manage">
          <a>admin/manage</a>
        </Link>
      </li>
    </ul>
    <h1>Home</h1>
    <Button>Hello</Button>
    <DynamicComponentWithNoSSR />
  </div>
);
