import React, { memo } from 'react';
import { ProductInCart } from 'models/products-in-cart';
import { ProductCartItem } from './product-cart-item';

interface ProductCartTableProps {
  products: ProductInCart[];
}

export const ProductCartTable = memo<ProductCartTableProps>(({ products }) => {
  return (
    <table>
      {products.map(product => (
        <ProductCartItem key={product.id} product={product} />
      ))}
    </table>
  );
});
