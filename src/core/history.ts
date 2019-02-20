export interface IHistory {
  history: IHistorySlider;
}

export interface IHistorySlider {
  undo: () => void;
  redo: () => void;
}

/**
 * Довольно абстрактная вещь, но позволяющая через композицию предоставить доступ
 * методам undo и redo emitter'a при этом сохраняя инкапсуляцию.
 *
 * @export
 * @class History
 * @implements {IHistorySlider}
 */
export class History implements IHistorySlider {
  private _historyEmitter: IHistorySlider;

  constructor(historyEmitter: IHistorySlider) {
    this._historyEmitter = historyEmitter;
  }

  undo = () => this._historyEmitter.undo();
  redo = () => this._historyEmitter.redo();
}
