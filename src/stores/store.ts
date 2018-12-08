/**
 * Все сторы by design - синглтоны
 *
 * @export
 * @class Store
 */
export class Store {
  protected static _instance: Store;

  protected constructor() {
    this.load();
  }

  /**
   *
   *
   * @static
   * @returns
   * @memberof Store
   */
  static getInstance(): unknown {
    // К сожалению, в ts нет возможности нормально указать возвращаемый тип,
    // поэтому в наследниках делаем приведение типов ручками :С
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  protected load() {}
}
