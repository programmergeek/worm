import { Token } from "./lib/types";
import { t_KEYWORDS } from "./lib/constants";
import { validateToken } from "./lib/decorators";

@validateToken
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
