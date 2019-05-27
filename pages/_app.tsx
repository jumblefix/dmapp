import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppGlobalStyle } from '../src/utils/globalStyles';
import { appTheme } from '../src/utils/theme';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <AppGlobalStyle />
        <ThemeProvider theme={appTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
