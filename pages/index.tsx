import React from 'react';
import Link from 'next/link';

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
  </div>
);
