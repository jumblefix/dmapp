import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const Editor = dynamic(() => import('../../src/components/QuillEditor'), {
  ssr: false,
});

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
        <div id="editor">
          <Editor />
        </div>
      </div>
    );
  }
}
