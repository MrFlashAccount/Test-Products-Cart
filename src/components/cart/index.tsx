import React from 'react';
import { Product } from 'stores/products';

interface CartProps {
  product: Product;
}

const Cart = React.memo<CartProps>(props => {
  return <div>{props.product.id}</div>;
});

export default Cart;
