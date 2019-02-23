/**
 * Забирает данные из внутреннего хранилища
 *
 * @export
 * @template T
 * @param {string} key ключ, по которому лежат данные
 * @param {T} fallback данные, которые вернутся в случае ошибки
 * @returns {T} Данные из внутреннего хранилища или fallback
 */
export function fromPersistentStorage<T>(key: string, fallback: T): T {
  const maybeState = localStorage.getItem(key);

  try {
    if (maybeState) {
      return JSON.parse(maybeState);
    }

    return fallback;
  } catch (e) {
    return fallback;
  }
}

/**
 * Сохраняет данные во внутреннее хранилище
 *
 * @export
 * @template T
 * @param {string} key ключ, по которому сохранятся данные
 * @param {T} value значение, которое нужно сохранить
 */
export function toPersistentStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
