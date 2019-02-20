import React, { memo } from 'react';
import { Product } from 'stores/products';

export const ProductItem = memo<{ product: Product }>(() => {
  return <div />;
});
