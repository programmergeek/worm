export class TokenError extends Error {
  constructor(tokenType: string, message?: string) {
    super(message);
  }
}
