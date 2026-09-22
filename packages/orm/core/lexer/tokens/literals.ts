import { validateToken } from "./lib/decorators";
import { Token } from "./lib/types";

@validateToken
export class Literal extends Token {
  constructor() {
    super();
  }

  public getTokenType() {
    return "LITERAL";
  }

  public getLiteralType(): unknown {
    return;
  }

  public getLiteralValue(): unknown {
    return;
  }
}
