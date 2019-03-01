import { Observable } from 'kefir';

/**
 * Функция позволяет получить текущее значение потока, если оно определено
 *
 * @export
 * @template T - тип данных
 * @template S - тип ошибки
 * @param {Observable<T, S>} observable поток, значение которого нужно получить
 * @returns {T} текущее значение потока
 */
export function getImmediate<T, S>(observable: Observable<T, S>): T {
  let value: T;
  observable.take(1).observe(v => (value = v));

  return value!;
}
