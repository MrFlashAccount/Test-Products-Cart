import { PersistentEmitter } from './PersistentEmitter';
import { Property } from 'kefir';
import { property } from './utils';
import { IHistorySlider } from 'core/IHistorySlider';

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

    this.pPast.log('Past');
    this.pFuture.log('Future');

    this._pushToHistory(initial);
  }

  set(value: T) {
    this._pushToHistory(value);

    super.set(value);
  }

  undo() {
    this._slideHistory(this._eFuture, this._ePast);
  }

  redo() {
    this._slideHistory(this._ePast, this._eFuture);
  }

  private _pushToHistory(newValue: T) {
    this._eFuture.set([]);
    this._ePast.patch(value => [...value, newValue]);
  }

  /**
   * Двигается по истории. направление определяется порядком эмиттеров.
   *
   * @private
   * @param {PersistentEmitter<T[], S>} from откуда движемся
   * @param {PersistentEmitter<T[], S>} to куда движемся
   * @memberof HistoryEmitter
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
