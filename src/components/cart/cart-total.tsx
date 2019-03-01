import { css } from 'astroturf';
import { useImmediateProperty } from 'hooks/useProperty';
import { Property } from 'kefir';
import { cartTotal, ProductsInCart } from 'models/products-in-cart';
import React, { memo } from 'react';
import { Amount } from '../partial/amount';

export interface CartTotalProps {
  pProductsInCart: Property<ProductsInCart, any>;
}

/**
 * Сумма корзины с промежуточным итогом и величиной скидки
 */
export const CartTotal = memo<CartTotalProps>(({ pProductsInCart }) => {
  const [total] = useImmediateProperty(cartTotal(pProductsInCart));

  return (
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
  );
});

const styles = css`
  .wrap {
    padding: 16px 0;

    @media print {
      padding: 16px 0 0;
    }
  }
`;
