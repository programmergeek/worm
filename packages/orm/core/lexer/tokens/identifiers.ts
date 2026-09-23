import { validateToken } from "./lib/decorators";
import { Token } from "./lib/types";

@validateToken
export class Identifier extends Token {
  constructor() {
    super();
  }

  public getTokenType() {
    return "IDENTIFER";
  }

  public static test(lexem: string): boolean {
    // Regular identifier rules:
    // - First character must begin with a letter
    // - Following characters can be letters, numbers and underscore (_)
    // - They are case inssensitive
    const regularIdentifierRegex = /[a-zA-Z]\w*/;

    const delimitedIdentifierRegex = /^"[^"]*"?/gm;

    // eveything in the lexem that matches the regex will be extracted and then
    // compared to the original lexem. If the extracted string and the current
    // lexem do not match then the test fails and the current lexem cannot be
    // an identifer
    const extractedString = (() => {
      if (lexem[0] === '"') {
        const result = delimitedIdentifierRegex.exec(lexem);
        return result === null ? null : result[0];
      }

      const result = regularIdentifierRegex.exec(lexem);
      return result === null ? null : result[0];
    })();
    if (extractedString == null) {
      return false;
    }

    if (lexem === extractedString) {
      return true;
    }

    return false;
  }
}
