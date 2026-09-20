export interface TokenType {
  type: string;
  value: string;
  location: {
    line: number;
    col: number;
  };
}

// Theses are words and phrases reserved in standard SQL and therefore acts as a core list
// that is to be expanded upon using the db specific plugin
const t_KEYWORDS = [
  "ADD",
  "ALTER",
  "AND",
  "ANY",
  "AS",
  "ASC",
  "BACKUP",
  "BETWEEN",
  "CASE",
  "CHECK",
  "COLUMN",
  "CONSTRAINT",
  "CREATE",
  "DATABASE",
  "DEFAULT",
  "DELETE",
  "DESC",
  "DROP",
  "EXEC",
  "EXISTS",
  "FOREIGN",
  "KEY",
  "FROM",
  "FULL",
  "GROUP",
  "BY",
  "HAVING",
  "IN",
  "IS",
  "NULL",
  "NOT",
  "JOIN",
  "LIKE",
  "LIMIT",
  "NULL",
  "OR",
  "ORDER",
  "OUTER",
  "PRIMARY",
  "PROCEDURE",
  "RIGHT",
  "ROWNUM",
  "SELECT",
  "DISTINCT",
  "SET",
  "TABLE",
  "UNION",
  "UNION",
  "ALL",
  "UNIQUE",
  "UPDATE",
  "VALUES",
  "VIEW",
  "WHERE",
] as const;

const t_SYMBOLS = [
  ",",
  "(",
  ")",
  "<",
  ">",
  ".",
  ";",
  "=",
  "+",
  "-",
  "*",
  "<>",
  "<=",
  ">=",
  "/",
  ":",
  "?",
  "~>",
  "~<",
  "~=",
  '"',
] as const;

class TokenError extends Error {
  constructor(tokenType: string, message?: string) {
    super(message);
  }
}

abstract class Token {
  private _line: number | null;
  private _col: number | null;

  constructor() {
    this._line = null;
    this._col = null;
  }

  public setLineNumber(line: number) {
    this._line = line;
  }

  public setColNumber(col: number) {
    this._col = col;
  }

  public getLineNumber() {
    return this._line;
  }

  public getColNumber() {
    return this._col;
  }

  abstract getTokenType(): string;

  // this will test the current lexem against the rules (i.e a regex) of the token type
  static test(lexem: string): boolean {
    if (lexem.length > 0) {
      throw new TokenError("INVALID_TOKEN");
    }
    return false;
  }
}

export class KeyWord extends Token {
  private _keyword: string;

  public constructor(keyword: string) {
    super();
    this._keyword = keyword;
  }

  public setKeyWord(newKeyWord: string): void {
    this._keyword = newKeyWord;
  }

  public getKeyWord(): string {
    return this._keyword;
  }

  public static test(lexem: string): boolean {
    // check if the current lexem resembles any of the keywords
    const matchFound = t_KEYWORDS.some((keyword) =>
      keyword.toLowerCase().startsWith(lexem.toLowerCase()),
    );

    return matchFound;
  }

  public getTokenType() {
    return "KEY_WORD";
  }
}

export class Symbol extends Token {}

export class Identifier extends Token {}

export class Comment extends Token {}

export class Literal extends Token {}
