import { css } from 'astroturf';
import { useProperty } from 'hooks/useProperty';
import { cartTotal, productsInCart } from 'models/products-in-cart';
import React, { memo } from 'react';
import { Amount } from '../partial/amount';
import { products } from 'stores/products';
import coupons from 'stores/coupons';
import cart from 'stores/cart';

/**
 * Сумма корзины с промежуточным итогом и величиной скидки
 */
export const CartTotal = memo(() => {
  const pProductsInCart = productsInCart(products.pProducts, coupons.pCoupons, cart.pCurrentCart);
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
