import { Observable } from 'kefir';
import { useEffect, useState } from 'react';
import { getImmediate } from 'core/utils/get-immediate';

/**
 * Подписывается на поток
 *
 * @param observable
 * @param initial начальное значение, до активации потока.
 */
export const useProperty = <T, S>(observable: Observable<T, S>, initial: T): [T, S | undefined] => {
  const [prop, setProp] = useState<T>(initial);
  const [error, setError] = useState<S | undefined>(undefined);

  useEffect(() => observable.observe(setProp, setError).unsubscribe, []);

  return [prop, error];
};

/**
 * Подписывается на поток. Начальное значение определяет из текущего значения потока
 * @param observable
 */
export const useImmediateProperty = <T, S>(observable: Observable<T, S>): [T, S | undefined] => {
  return useProperty(observable.skip(1), getImmediate(observable));
};
