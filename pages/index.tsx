import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default () => (
  <div>
    <ul>
      <li>
        <Link href="/about" as="/about">
          <a>about</a>
        </Link>
      </li>
    </ul>
    <h1>Home</h1>
    <Button>Hello</Button>
  </div>
);
