const size = 5; // length of the smallest postgres message possible
let buffer: Buffer = Buffer.alloc(size);

const messageKeys = [
  "B",
  "C",
  "c",
  "D",
  "d",
  "E",
  "f",
  "H",
  "P",
  "p",
  "Q",
  "S",
  "X",
] as const;

type MessageType = Record<
  (typeof messageKeys)[number],
  () => typeof messageBuilder
>;

const messageTypes: MessageType = messageKeys.reduce((acc, type) => {
  const t = type.charCodeAt(0);
  acc[type] = () => {
    buffer[0] = t;
    messageBuilder.setCursor(5);
    return messageBuilder;
  };
  return acc;
}, {} as MessageType);

const resize = (x: number) => {
  if (buffer.length - messageBuilder.cursor() < x) {
    const prev = buffer;
    const length = prev.length;

    buffer = Buffer.alloc(length + (length >> 1) + x);
    prev.copy(buffer);
  }
};

class MessageBuilder {
  private _cursor: number;
  constructor() {
    this._cursor = 0;
  }

  str = (x: string): this => {
    const tempBuff = Buffer.alloc(Buffer.byteLength(x));
    tempBuff.write(x, 0, "utf-8");
    buffer = Buffer.concat([buffer.subarray(0, this.cursor()), tempBuff]);
    this.setCursor(buffer.length);
    return this;
  };

  endStr() {
    this.str(String.fromCharCode(0));
    return this;
  }

  int16(i: number) {
    resize(2);
    buffer.writeUInt16BE(i, this._cursor);
    this._cursor += 2;
    return this;
  }

  int32(x: number) {
    resize(4);
    buffer.writeUInt32BE(x, this._cursor);
    return this;
  }

  rawBuf(x: Buffer) {
    buffer = Buffer.concat([buffer.subarray(0, this.cursor()), x]);
    this.setCursor(buffer.length);
    return this;
  }

  end(at = 1) {
    buffer.writeUint32BE(this.cursor() - at, at);
    const outputMessageBuffer = buffer.subarray(0, this.cursor());
    //reset cursor and buffer
    this.setCursor(0);
    buffer = Buffer.alloc(size);

    return outputMessageBuffer;
  }

  setCursor(i: number) {
    this._cursor = i;
  }

  cursor() {
    return this._cursor;
  }
}

/**
 * This object contains all of the method you need to contruct the different message types in the postgres wire protocol.
 *
 * Reference:
 * [Protocol Message Formats](https://www.postgresql.org/docs/current/protocol-message-formats.html)
 * [Message Data Types](https://www.postgresql.org/docs/current/protocol-message-types.html)
 * */
const messageBuilder = Object.assign(messageTypes, new MessageBuilder());

messageBuilder.str("meep").end;

export default messageBuilder;
