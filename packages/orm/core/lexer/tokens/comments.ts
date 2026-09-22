import { validateToken } from "./lib/decorators";
import { Token } from "./lib/types";

@validateToken
export class Comment extends Token {
  private _commentType: "MULTI_LINE" | "SINGLE_LINE" | undefined;

  public getTokenType() {
    return "COMMENT";
  }

  public getCommentType() {
    return this._commentType;
  }
}
