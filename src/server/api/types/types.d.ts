import { Request, Response } from 'express';
export interface ConnectionList {
  [key: string]: any;
}

export interface AppContext {
  req: Request;
  res: Response;
}

export type Lazy<T extends object> = Promise<T> | T;
