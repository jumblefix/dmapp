import 'styled-components';
import { createArticlesLoader } from '../api/articleTagsLoader';

declare module 'styled-components' {
  export interface IDefaultTheme {
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

import { Request, Response } from 'express';
export interface ConnectionList {
  [key: string]: any;
}

export interface AppContext {
  req: Request;
  res: Response;
  articlesLoader: ReturnType<typeof createAuthorsLoader>;
}

export type Lazy<T extends object> = Promise<T> | T;
