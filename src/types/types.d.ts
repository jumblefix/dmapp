import 'styled-components';

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
import { createArticlesLoader } from '../api/articleLoader';
export interface ConnectionList {
  [key: string]: any;
}

export interface AppContext {
  req: Request;
  res: Response;
  articleLoader: ReturnType<typeof createArticlesLoader>;
}

export type Lazy<T extends object> = Promise<T> | T;
