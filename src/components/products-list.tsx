import React from 'react';
import { products } from 'stores/products';
import { ProductCard } from 'components/product-card';
import cart from 'stores/cart';
import useProperty from 'hooks/useProperty';

export const ProductsList = React.memo(() => {
  const [productsList] = useProperty(products.pProducts, undefined);

  return (
    <>
      <button onClick={() => cart.history.undo()}>Назад</button>
      <button onClick={() => cart.history.redo()}>Вперед</button>

      {productsList ? productsList.map(product => <ProductCard key={product.id} product={product} />) : null}
    </>
  );
});
