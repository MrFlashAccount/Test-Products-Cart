import { combine, Property, stream } from 'kefir';
import { History } from './history';
import { HistoryEmitter } from './history-emitter';
import { PersistentEmitter } from './persistent-emitter';

export type HistoryProperty<T, S> = Property<[T, T[], T[]], S>;

/**
 * Создает постоянный поток, который хранит историю своего изменения.
 *
 * @export
 * @template T - тип хранимых данных
 * @template S - тип ошибки
 * @param {T} initial - начальное значение
 */
export function propertyWithHistory<T, S = never>(
  initial: T
): [HistoryProperty<T, S>, HistoryEmitter<T, S>, History] {
  const [pCurrent, emitter] = createProperty<HistoryEmitter<T, S>, T, S>(new HistoryEmitter(initial));

  return [
    combine([pCurrent, emitter.pPast, emitter.pFuture])
      .toProperty()
      // Т.к. значение во все потоки ставится не одновременно,
      // но потоки *связаны*, значит, поставим небольшой debounce, чтобы итоговый поток
      // дождался изменения всех внутренних потоков, и затем оповестил подписчиков
      // Таким образом мы исключим "спам" событий
      .debounce(0),
    emitter,
    new History(emitter),
  ];
}

/**
 * Создает постоянный поток
 *
 * @export
 * @template T - тип хранимых данных
 * @template S - тип ошибки
 * @param {T} initial - начальное значение
 */
export function property<T, S = never>(initial: T) {
  return createProperty<PersistentEmitter<T, S>, T, S>(new PersistentEmitter<T, S>(initial));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Создает поток и привязывает эмиттер к переданной обертке над эмиттером
 *
 * @template E - тип эмиттера
 * @template T - тип данных
 * @template S - тип ошибки
 * @param {E} ourEmitter - instance обертки над эмиттером
 * @returns {[Property<T, S>, E]} Поток и обертка с привязанным эмиттером
 */
function createProperty<E extends PersistentEmitter<T, S>, T, S>(ourEmitter: E): [Property<T, S>, E] {
  const property = stream<T, S>(emitter => ourEmitter.bind(emitter)).toProperty();

  return [property, ourEmitter];
}
