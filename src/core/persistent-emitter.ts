import { Emitter } from 'kefir';

/**
 * Эмиттер, который хранит последнее значение
 *
 * @export
 * @class PersistentEmitter
 * @template T тип данных
 * @template S тип ошибки
 */
export class PersistentEmitter<T, S = never> {
  get lastValue(): T {
    return this._lastValue;
  }

  protected _lastValue: T;
  protected _emitter: Emitter<T, S> | null = null;

  constructor(initial: T) {
    this._lastValue = initial;
  }

  /**
   * Устанавливает новое значение эмиттера
   *
   * @param {T} value
   * @memberof PersistentEmitter
   */
  set(value: T) {
    if (this._emitter) {
      this._lastValue = value;
      this._emitter.value(value);
    } else throw Error('Попытка установки значения до привязки эмиттера');
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

    emitter.value(this._lastValue);
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
