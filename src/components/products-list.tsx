import React from 'react';
import { products } from 'stores/products';
import { ProductCard } from 'components/product-card';
import { useProperty } from 'hooks/useProperty';
import { Grid } from './grid';

export const ProductsList = React.memo(() => {
  const [productsList] = useProperty(products.pProducts, undefined);

  return (
    <>
      <h1>Список товаров</h1>

      {productsList ? (
        <Grid>
          {productsList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      ) : null}
    </>
  );
});
