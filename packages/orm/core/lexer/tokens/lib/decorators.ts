interface TokenType {
  new (...args: any[]): Token;
  test(lexem: string): boolean;
}

export function validateToken<T extends TokenType>(constructor: T) {
  return constructor;
}
