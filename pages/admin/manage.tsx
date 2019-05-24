import Link from 'next/link';
import React from 'react';

export default () => (
  <div>
    <Link href="/admin" as="/admin">
      <a href="/admin">Back to Home</a>
    </Link>
    <p>Manage Posts</p>
  </div>
);
