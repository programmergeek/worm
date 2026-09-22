import { t_SYMBOLS } from "./constants";

export type t_SYMBOL_TYPE = (typeof t_SYMBOLS)[number];

export type SymbolType = Record<(typeof t_SYMBOLS)[number], string>;

export abstract class Token {
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
}
