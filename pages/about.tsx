import React from 'react';
import Link from 'next/link';

export default () => (
  <div>
    <Link href="/" as="/">
      <a>Back to Home</a>
    </Link>
    <h1>About Us</h1>
  </div>
);
