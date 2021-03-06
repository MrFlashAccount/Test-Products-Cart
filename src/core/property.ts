import * as kefir from 'kefir';
import { History } from './history';
import { HistoryEmitter } from './history-emitter';
import { PersistentEmitter } from './persistent-emitter';

export type HistoryProperty<T, S> = kefir.Property<[T, T[], T[]], S>;

/**
 * Создает постоянный поток, который хранит историю своего изменения.
 * ***
 * @template T - тип хранимых данных
 * @template S - тип ошибки
 * ***
 * @param {T} initial - начальное значение
 * @param {T[]} [pastInitial=[]] - начальное значение прошлого
 * @param {T[]} [futureInitial=[]] - начальное значение будущего
 */
export function propertyWithHistory<T, S = never>(
  initial: T,
  pastInitial: T[] = [],
  futureInitial: T[] = []
): [HistoryProperty<T, S>, HistoryEmitter<T, S>, History] {
  const [pCurrent, emitter] = createProperty<HistoryEmitter<T, S>, T, S>(
    new HistoryEmitter(initial, pastInitial, futureInitial)
  );

  return [
    kefir
      .combine([pCurrent, emitter.pPast, emitter.pFuture])
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
function createProperty<E extends PersistentEmitter<T, S>, T, S>(ourEmitter: E): [kefir.Property<T, S>, E] {
  const property = kefir.stream<T, S>(emitter => ourEmitter.bind(emitter)).toProperty();

  return [property, ourEmitter];
}
