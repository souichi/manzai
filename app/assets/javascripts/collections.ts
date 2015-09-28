export class Queue<T> {
  private data: T[];

  constructor() {
    this.data = new Array<T>();
  }

  public get size(): number {
    return this.data.length;
  }

  public enqueue(o:T): void {
    this.data.push(o);
  }

  public dequeue(): T {
    if (0 < this.data.length) {
        return this.data.shift();
    } else {
      return null;
    }
  }

  public toString(): string {
    return "[" + this.data.join(",") + "]";
  }
}
