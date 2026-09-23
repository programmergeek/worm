import { readFile } from "node:fs/promises";

export class Lexer {
  private constructor() {}

  public tokenize(schema: string) {
    // 1. Read the entire schema file
    // 2. separate the different table schemas

    /* Example Schema Query:
     * CREATE TABLE person (
     *	    id	    INT PRIMARY KEY,
     *	    name    VARCHAR(50) NOT NULL,
     *	    email   VARCHAR(100),
     *	    address VARCHAR(50),
     * );
     *
     */

    return [];
  }
}
