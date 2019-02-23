import { css } from 'astroturf';
import React, { memo } from 'react';
import { Amount } from '../partial/amount';
import { useProperty } from 'hooks/useProperty';
import { cartTotal, ProductsInCart } from 'models/products-in-cart';
import { Property } from 'kefir';

export interface CartTotalProps {
  pProductsInCart: Property<ProductsInCart, any>;
}

/**
 * Сумма корзины с промежуточным итогом и величиной скидки
 */
export const CartTotal = memo<CartTotalProps>(({ pProductsInCart }) => {
  const [total] = useProperty(cartTotal(pProductsInCart), undefined);

  return total ? (
    <div className={styles.wrap}>
      <p>
        Сумма: <Amount amount={total.amount} />
      </p>
      {total.discount ? (
        <p>
          Скидка: <Amount amount={total.discount} />
        </p>
      ) : null}
      <p>
        Итог: <Amount amount={total.total} />
      </p>
    </div>
  ) : null;
});

const styles = css`
  .wrap {
    padding: 16px 0;
  }
`;
