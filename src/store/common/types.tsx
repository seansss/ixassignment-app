import { AxiosRequestConfig } from 'axios'

export interface IParams {
  callback?: any;
  bucket?: any;
}

export enum StatusEnums {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
  NOTFOUND = 'notfound',
}

export enum HTTPEnums {
  OK = '200',
  CREATED = '201',
  ACCEPTED = '202',
  BADREQUEST = '400',
  UNAUTHORIZED = '401',
  FORBIDDEN = '403',
  NOTFOUND = '404',
  FAILED = '500',
}

export function GetHTTP(message?: string): HTTPEnums {
  if (!message) {
    return HTTPEnums.OK
  }

  const notfound = /404/
  const unauthorized = /401/

  if (message.match(notfound)) {
    return HTTPEnums.NOTFOUND
  } else if (message.match(unauthorized)) {
    return HTTPEnums.UNAUTHORIZED
  }

  return HTTPEnums.OK
}

export interface IParams {
  callback?: any;
}

export interface IHTTPRequest {}

export interface IHTTPResponse extends IHTTPRequest {
  data: IHTTPResponseData;
  status: number;
}

export interface IHTTPResponseData {
    status: number;
    data: any;
    message?: string;
  }

export interface AxiosResponse<T = never> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig<T>;
    request?: any;
  }

export interface IHttpCoreResponse<T = never> {
    status: number;
    results?: T;
    message?: string;
  }

export type Project = {
    id: string;
    name: string;
    startDate: string;
    files?: File[];
    users?: User[];
};

export type User = {
    id: string;
    name: string;
    email: string;
};

export type File = {
    filePath: string;
    name: string;
    type: string;
    id: string;
};
