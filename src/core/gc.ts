export class GarbageCollector {
  private _collectors: Function[];

  constructor() {
    this._collectors = [];
  }

  add(collector: Function) {
    this._collectors.push(collector);
  }

  release() {
    this._collectors.map(c => c());
    this._collectors = [];
  }
}
