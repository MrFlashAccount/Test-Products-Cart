import React from 'react';
import { products } from 'stores/products';
import { ProductCard } from 'components/products/product-card';
import { useProperty } from 'hooks/useProperty';
import { Grid } from '../partial/grid';

/**
 * Список товаров на главной
 */
export const ProductsList = React.memo(() => {
  return (
    <>
      <header>
        <h1>Список товаров</h1>
      </header>

      <section>
        <List />
      </section>
    </>
  );
});

const List = () => {
  const [productsList] = useProperty(products.pProducts, undefined);

  return productsList ? (
    <Grid>
      {productsList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  ) : null;
};
