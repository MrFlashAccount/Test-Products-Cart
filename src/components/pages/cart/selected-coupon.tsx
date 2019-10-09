import React, { memo } from 'react';
import { useImmediateProperty } from 'hooks/useProperty';
import cart from 'stores/cart';
import { css } from 'astroturf';
import { Button, MemoizedButton } from '../../partial/button';
import { ProductsInCart } from 'models/products-in-cart';
import { Property } from 'kefir';
import { products, Product } from 'stores/products';
import { Amount } from '../../partial/amount';
import { ObjectMap } from 'types';
import { Coupon } from 'stores/coupons';

export interface SelectedCouponProps {
  pProductsInCart: Property<ProductsInCart, any>;
}

/**
 * Выводит информацию о текущем выбранном купоне
 */
export const SelectedCoupon = memo<SelectedCouponProps>(({ pProductsInCart }) => {
  const [coupon] = useImmediateProperty(pProductsInCart.map(productsInCart => productsInCart.coupon));
  const [allProducts] = useImmediateProperty(products.pProducts);

  let couponProduct: Product | undefined = undefined;

  if (coupon && coupon.kind === 'product') {
    couponProduct = allProducts.find(product => product.id === coupon.productID);
  }

  return coupon ? (
    <>
      <section className={styles.coupon}>
        <h4>Выбран купон: {coupon.id}</h4>

        <MemoizedButton
          buttonStyle="null"
          onClick={cart.removeCoupon}
          extraClass={styles.delete}
          title={'Удалить купон'}
          aria-label={'Удалить купон'}
        />
      </section>

      <section>
        <p>Скидка: {coupon.type === 'fixed' ? <Amount amount={coupon.amount} /> : `${coupon.amount}%`}</p>
        <p>Применение купона: {couponKindToHumanFormat[coupon.kind]}</p>
        {couponProduct && <p>Применяется к товару: {couponProduct.name}</p>}
      </section>
    </>
  ) : null;
});

const couponKindToHumanFormat: ObjectMap<Coupon['kind'], string> = {
  cart: 'к корзине',
  product: 'к товару',
};

// tslint:disable
const styles = css`
  .coupon {
    display: flex;
    align-items: center;
    margin-top: 24px;
  }

  .delete {
    width: 24px;
    height: 24px;
    margin-left: 8px;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath d='M625.1 789.2a35.3 35.3 0 0 1-34.4-34.4V325.6a35.3 35.3 0 0 1 34.4-34.4 33.8 33.8 0 0 1 34.4 34.4V757a33.4 33.4 0 0 1-34.4 32.2zM395.6 789.2a35.3 35.3 0 0 1-34.4-34.4V325.6c0-18.4 16.1-34.4 34.4-34.4S430 305 430 325.6V757c0 16.1-16.1 32.2-34.4 32.2z'/%3E%3Cpath d='M705.4 993.4H315.2c-105.6 0-183.6-91.8-183.6-195.1V321a35.3 35.3 0 0 1 34.4-34.4 35.3 35.3 0 0 1 34.4 34.4v477.4c0 66.6 48.2 126.2 114.8 126.2h390.2c64.3 0 114.8-62 114.8-126.2V321c0-18.4 16.1-34.4 34.4-34.4s34.4 16 34.4 34.4v477.4c0 103.2-80.3 195-183.6 195zM730.7 206.2a35.3 35.3 0 0 1-34.4-34.4c0-96.4-27.5-96.4-41.3-96.4H358.9c-13.8 0-55.1 0-55.1 96.4a35.3 35.3 0 0 1-34.4 34.4 35.3 35.3 0 0 1-34.4-34.4c0-41.3 16.1-165.2 123.9-165.2H655c73.4 0 110.2 55.1 110.2 165.2a35.4 35.4 0 0 1-34.5 34.4z'/%3E%3Cpath d='M953.3 213.1H44.4A35.3 35.3 0 0 1 10 178.7a33.8 33.8 0 0 1 34.4-34.4h911.1a35.3 35.3 0 0 1 34.4 34.4c.1 18.3-16 34.4-36.6 34.4z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px;
  }
`;
