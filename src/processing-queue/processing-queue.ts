export interface IQueueNode<T> {
  value: T;
  next: IQueueNode<T> | null;
}

export class ProcessingQueue<T> {
  private head: IQueueNode<T> | null = null;
  private tail: IQueueNode<T> | null = null;
  private processedItems: T[] = [];
  private items: T[];
  private length = 0;

  constructor (private limit: number, private processCallback: (item: T) => Promise<T>) {
    this.items = Array.from({ length: this.limit });
  }

  public getNode (value: T): IQueueNode<T> {
    return {
      value,
      next: null
    };
  }

  public push (val: T): void {
    this.tail = this.tail || this.getNode(val);

    if (!this.head) {
      this.head = this.getNode(val);
    } else {
      const newNode: IQueueNode<T> = this.getNode(val);

      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;
  }

  public pop (): T {
    const value: T = this.head.value;

    this.head = this.head.next;
    this.length -= 1;

    return value;
  }

  public peak (): T {
    return this.head.value;
  }

  public get size (): number {
    return this.length;
  }

  private get isEmpty (): boolean {
    return this.size === 0;
  }

  public fill (items: T[]): void {
    while (items.length) {
      this.push(items.shift());
    }
  }

  public processItem (): Promise<T> | Promise<null> {
    if (this.isEmpty) {
      return Promise.resolve(null);
    }

    const item = this.pop();

    return this.processCallback(item)
      .then((processedItem: T) => {
        this.processedItems.push(processedItem);

        if (this.size % 10 === 0 && !this.isEmpty) {
          console.log(`${this.size} items left.`);
        }

        return this.processItem();
      });
  }

  public processItems (): Promise<any[]> {
    const start: number = Date.now();

    console.log(`Processing ${this.size} items...`);

    return Promise.all(this.items.map((item) => this.processItem()))
      .then(() => {
        const end: number = Date.now();

        console.log(`Processing completed in ${(end - start) / 1000} sec.`);

        return this.processedItems;
      });
  }
}
