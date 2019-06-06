import { NextContext } from 'next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: NextContext) {
    const initialProps = await Document.getInitialProps(ctx as any);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href="/static/img/icons/favicon/favicon.ico"
            type="image/x-icon"
          />
          <link rel="stylesheet" href="/static/css/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
