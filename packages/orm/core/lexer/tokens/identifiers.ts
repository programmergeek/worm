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
    const identifierRegex = /[a-z]/;
    // eveything in the lexem that matches the regex will be extracted and then
    // compared to the original lexem. If the extracted string and the current
    // lexem do not match then the test fails and the current lexem cannot be
    // an identifer
    const extractedString = identifierRegex.exec(lexem);
    if (extractedString == null) {
      return false;
    }

    if (lexem === extractedString[0]) {
      return true;
    }

    return false;
  }
}
