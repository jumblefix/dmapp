import Link from 'next/link';
import React from 'react';

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <Link href="/" as="/">
          <a href="/">Home</a>
        </Link>
        <br />
        <Link href="/admin/manage" as="/admin/manage">
          <a href="/admin">Manage</a>
        </Link>
        <p>Admin Home</p>
      </div>
    );
  }
}
