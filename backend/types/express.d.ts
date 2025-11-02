// This file tells TypeScript that we are adding a new property to the existing Express Request type.

declare namespace Express {
  export interface Request {
    // We are declaring an optional (?) property named 'userId' that will be a string.
    // It's optional because routes that don't use the userVerification middleware (like /login) won't have it.
    userId?: string;
  }
}