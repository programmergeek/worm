# Lexical Analysis

## The theory in a nutshell

The goal of lexical analysis is to take a some piece of code, split it up into
its smallest parts that still contain some meaning (a.k.a the lexemes) and turn
everything into tokens.

No syntax checks are done here, nor do we check for the correctness of the code,
all of that is handled by some other part of the compiler.

We can determine what type of token a lexem is by using a finite state machine.

## How this is going to work

The sql files are going to be read from the filesystem into the program. The
tokenizer will then process the contents of the files as a character stream.
Every character in the stream will be fed into the state machine to eventually
get an array of tokens.

Each token will be an object with properties storing the lexem the token was
made from, the type of token it is and the location of where the lexem was
found in the source code file.

Token Example:

```typescript
{
    value: "SELECT",
    type: t_KEYWORD,
    location: {
        line: 31,
        col: 55
    }
}
```

Because the library is meant to support many dialects of the SQL standard the
state will be extensible to accomodate whatever dialect is being used.

### The state machine

The tokenizer class will read a stream of characters. Each new character in the
stream will be added to a string variable we will call `lexem`. Each time a new
character is added to the string variable we will compare the it agains the rules
for each token type. The first token type is matches with will be considered
the type of token the string is. As more characters are added onto the string
it may then match with other token types and thefore the type of token it is
will change until it reaches a terminating character. A terminating character
is a character that cannot be included in the current `lexem` without violating
the token rules of the every token type.
