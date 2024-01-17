declare namespace Express {
  export interface Request {
    user?: {
      username: string;
      sub: number;
    };
  }
}

declare module 'graphql-upload/graphqlUploadExpress.js';
