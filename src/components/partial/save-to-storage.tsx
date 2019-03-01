import { useProperty } from 'hooks/useProperty';
import cart from 'stores/cart';
import { FC, useEffect } from 'react';
import { toPersistentStorage } from 'models/persistent-storage';

export const SaveToStorage: FC = () => {
  const [cartState] = useProperty(cart.pCart, undefined);
  useEffect(() => cartState && toPersistentStorage(cart.persistentStorageKey, cartState), [cartState]);

  return null;
};
