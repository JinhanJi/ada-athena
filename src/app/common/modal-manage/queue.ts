class Queue {
  private dataStore: any[];

  constructor() {
    this.dataStore = [];
  }

  public enqueue(e: any): void {
    if (!e || !e.priority || typeof(e.priority) != 'number' || Number.isNaN(e.priority)) {
      return;
    }
    let t = this.dataStore;
    // 弹窗出队之后会立即展示下一个，后续入队需要跳过第一个
    if (t[1] && t[1].priority && e.priority > t[1].priority) {
      t.splice(1, 0, e);
      return;
    }
    for (let i = 0; i <= t.length - 2; i++){
      if (t[i].priority >= e.priority && e.priority > t[i + 1].priority){
          t.splice(i + 1, 0, e);
          return;
      }
    }
    this.dataStore.push(e);
  }

  public dequeue() {
    this.dataStore.shift();
  }

  public front() {
    return this.dataStore[0];
  }

  public back() {
    return this.dataStore[this.dataStore.length - 1];
  }

  public isEmpty(): boolean {
    if (this.dataStore.length === 0) {
      return true;
    }
    return false;
  }

  public toString() {
    return this.dataStore.join(',');
  }

  public size() {
    return this.dataStore.length;
  }

  public clear() {
    this.dataStore = [];
  }
}

export default Queue;