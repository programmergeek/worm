import { SymbolTable, t_SYMBOLS } from "./lib/constants";
import { validateToken } from "./lib/decorators";
import { t_SYMBOL_TYPE, Token } from "./lib/types";

@validateToken
export class Symbol extends Token {
  private _symbol: t_SYMBOL_TYPE;

  constructor(symbol: t_SYMBOL_TYPE) {
    super();
    this._symbol = symbol;
  }

  public getTokenType() {
    return "SYMBOL";
  }

  public getSymbol() {
    return SymbolTable[this._symbol];
  }

  public setSymbol(symbol: t_SYMBOL_TYPE) {
    this._symbol = symbol;
  }

  public static test(lexem: string): boolean {
    const matchFound = t_SYMBOLS.some((symbol) => symbol.startsWith(lexem));
    return matchFound;
  }
}
