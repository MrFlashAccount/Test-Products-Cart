import { Emitter } from 'kefir';

export class PersistentEmitter<T, S = never> {
  public get lastValue(): T {
    return this._lastValue;
  }

  protected _lastValue: T;
  protected _emitter: Emitter<T, S> | null = null;

  constructor(initial: T) {
    this._lastValue = initial;
  }

  set(value: T) {
    if (this._emitter) {
      this._lastValue = value;
      this._emitter.emit(value);
    } else throw Error('Попытка установки значения до привязки эмиттера.');
  }

  /**
   * Модифицирует текущее значение
   *
   * @param {(v: T) => T} fn callback функция, в которую будет проброшено текущее значение
   * @memberof PersistentEmitter
   */
  patch(fn: (v: T) => T) {
    this.set(fn(this.lastValue));
  }

  /**
   * Связывает себя с эмиттером
   *
   * @param {Emitter<T, S>} emitter
   * @memberof PersistentEmitter
   */
  bind(emitter: Emitter<T, S>) {
    this._emitter = emitter;
  }

  /**
   * Отвязывается от эмиттера
   *
   * @memberof PersistentEmitter
   */
  unbind() {
    this._emitter = null;
  }
}
