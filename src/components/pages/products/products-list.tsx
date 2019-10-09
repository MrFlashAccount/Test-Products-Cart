import React from 'react';
import { products } from 'stores/products';
import { ProductCard } from 'components/pages/products/product-card';
import { useImmediateProperty } from 'hooks/useProperty';
import { Grid } from '../../partial/grid';

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
  const [productsList] = useImmediateProperty(products.pProducts);

  return productsList ? (
    <Grid>
      {productsList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  ) : null;
};
