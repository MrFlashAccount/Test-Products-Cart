import React, { memo } from 'react';
import { ProductInCart } from 'models/products-in-cart';
import cart from 'stores/cart';
import { Amount } from './amount';

/**
 * Карточка товара в корзине
 */
export const ProductCartItem = memo<{ product: ProductInCart }>(({ product }) => {
  return (
    <tr>
      <td>{product.productInfo.name}</td>
      <td>
        <input
          type="number"
          min="1"
          max={product.productInfo.count}
          value={product.count}
          onChange={({ target }) => cart.updateCount(product.id, +target.value)}
        />
      </td>
      <td>
        <Amount amount={product.productInfo.price} />
      </td>
      <td>
        <Amount amount={product.productInfo.price * product.count} />
      </td>
    </tr>
  );
});
