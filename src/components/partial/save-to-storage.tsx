import cart from 'stores/cart';
import { FC, useEffect } from 'react';
import { toPersistentStorage } from 'core/utils/persistent-storage';
import { useImmediateProperty } from 'hooks/useProperty';

export const SaveToStorage: FC = () => {
  const [cartState] = useImmediateProperty(cart.pCart);
  useEffect(() => toPersistentStorage(cart.persistentStorageKey, cartState), [cartState]);

  return null;
};
