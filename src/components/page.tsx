import React, { memo } from 'react';
import { ProductsList } from 'components/products-list';

export const Page = memo(() => {
  return (
    <main>
      <ProductsList />
    </main>
  );
});
