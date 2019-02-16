import { Observable } from 'kefir';
import { useEffect, useState } from 'react';

const useProperty = <T, S>(observable: Observable<T, S>, initial: T): [T, S | undefined] => {
  const [prop, setProp] = useState<T>(initial);
  const [error, setError] = useState<S | undefined>(undefined);

  useEffect(() => observable.observe(setProp, setError).unsubscribe, [observable]);

  return [prop, error];
};

export default useProperty;
