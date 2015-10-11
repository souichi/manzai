class StringBuffer {
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
    this.buffer = new Array<string>(newText);
  }

  public toString(): string {
    return this.buffer.join("");
  }
}

function adjustMaxLineLength(message: string, maxLineLength: number): string {
  message = message.replace((new RegExp("\r\n","g")),"");
  message = message.replace((new RegExp("\n","g")),"");
  var sb = new StringBuffer(message);
  var p = 0;
  var insertText = "<br>";
  while (p < sb.length){
    p += maxLineLength;
    if (message.indexOf(sb.toString()[p], 0) > -1){
      p++;
    }
    sb.insert(p, insertText);
    p += insertText.length;
  }
  return sb.toString();
}
