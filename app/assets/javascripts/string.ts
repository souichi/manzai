export class StringBuffer {
  private buffer: Array<string>;

  constructor(text: string) {
    this.buffer = new Array<string>();
    this.buffer.push(text);
  }

  public get length() : number {
    return this.buffer.toString().length;
  }

  public append(text: string): void {
    this.buffer.push(text);
  }

  public insert(index: number, text: string): void {
    var newText = (this.toString().slice(0, index) + text + this.toString().slice(index));
    this.buffer = new Array<string>();
    this.buffer.push(newText);
  }

  public toString(): string {
    return this.buffer.join("");
  }
}
