export interface TErrorSources {
  path: string;
  message: string;
}
export interface TGenericError {
  statusCode: number;
  message: string;
  errorSources?: TErrorSources[];
}

