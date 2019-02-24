import { KeyMap, IDMap } from 'types';

type Result<C extends number | string, T> = C extends number ? IDMap<T> : KeyMap<T>;

/**
 * Трансформирует массив в объект.
 * ##### ВАЖНО: в целях оптимизации доступа объект наследуется от null
 * ***
 * @template T тип элемента в массиве
 * @template K ключ в типе T
 * @template C тип значения по ключу. Должен быть string | number
 * ***
 * @param {T[]} array массив, который нужно преобразовать
 * @param {K} key по значению. этого поля будет лежать элемент массива
 * ***
 * @returns {Result<C, T>} объект с трансформированными значениями.
 */
export function arrayToObject<T extends {}, K extends keyof T, C extends T[K] & (number | string)>(
  array: T[],
  key: K
): Result<C, T> {
  let keyMap: Result<C, T> = Object.create(null);

  for (const item of array) {
    keyMap[item[key] as any] = item;
  }

  return keyMap;
}
