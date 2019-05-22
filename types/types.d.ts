import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      primary: string;
      secondary: string;
      info: string;
      success: string;
      error: string;
      disabled: string;
      white: string;
      black: string;
    };
  }
}
