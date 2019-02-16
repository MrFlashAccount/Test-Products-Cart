import { PersistentEmitter } from './persistent-emitter';
import { Property } from 'kefir';
import { property } from './utils';
import { IHistorySlider } from './history';

/**
 * Эмиттер, который позволяет перемещаться по истории.
 *
 * @export
 * @class HistoryEmitter
 * @extends {PersistentEmitter<T, S>}
 * @template T
 * @template S
 */
export class HistoryEmitter<T, S = never> extends PersistentEmitter<T, S> implements IHistorySlider {
  pPast: Property<T[], S>;
  private _ePast: PersistentEmitter<T[], S>;

  pFuture: Property<T[], S>;
  private _eFuture: PersistentEmitter<T[], S>;

  constructor(initial: T) {
    super(initial);

    [this.pPast, this._ePast] = property<T[]>([]);
    [this.pFuture, this._eFuture] = property<T[]>([]);
  }

  set(value: T) {
    this._pushToHistory(this._lastValue);

    super.set(value);
  }

  undo() {
    this._slideHistory(this._eFuture, this._ePast);
  }

  redo() {
    this._slideHistory(this._ePast, this._eFuture);
  }

  /**
   * Добавляет в историю новый элемент
   *
   * @private
   * @param {T} newValue
   */
  private _pushToHistory(newValue: T) {
    // "будущее" нужно сбросить, потому что текущее уже не актуально
    this._eFuture.set([]);
    this._ePast.patch(value => [...value, newValue]);
  }

  /**
   * Двигается по истории. направление определяется порядком эмиттеров.
   *
   * @param {PersistentEmitter<T[], S>} from откуда движемся
   * @param {PersistentEmitter<T[], S>} to куда движемся
   */
  private _slideHistory(from: PersistentEmitter<T[], S>, to: PersistentEmitter<T[], S>) {
    const { lastValue: futureValue } = to;
    const newLastValue = futureValue.pop();

    if (newLastValue) {
      to.set(futureValue);
      from.patch(value => [...value, this._lastValue]);

      super.set(newLastValue);
    }
  }
}
