import React, { memo, useCallback } from 'react';
import { ProductInCart } from 'models/products-in-cart';
import cart, { CartItem } from 'stores/cart';
import { Amount } from '../partial/amount';
import { MemoizedButton } from '../partial/button';
import { ProductCartItemAmount } from './product-cart-item-amount';
import { css } from 'astroturf';
import { WithoutPrint } from 'components/partial/print';
import { useProperty } from 'hooks/useProperty';
import { products } from 'stores/products';

/**
 * Карточка товара в корзине
 */
export const ProductCartItem = memo<{ item: CartItem }>(({ item }) => {
  const [product] = useProperty(products.pProductsMap.map(map => map[item.id]), undefined);

  const updateCount = useCallback((count: number) => cart.updateCount(item.id, count), []);
  const deleteFromCart = useCallback(() => cart.removeFromCart(item.id), []);

  if (!product) return null;

  return (
    <tr className={styles.item}>
      <Logo name={product.name} picture={product.picture} />
      <ItemInfo name={product.name} count={product.count} price={product.price} />

      <td className={styles.row}>
        <ProductCartItemAmount maxCount={product.count} count={item.count} updateCount={updateCount} />
      </td>

      <td className={styles.total}>
        <Amount amount={product.price * product.count} />
      </td>

      <td className={styles.row}>
        <MemoizedButton
          buttonStyle={'null'}
          extraClass={styles.delete}
          title={`Удалить товар ${product.name}`}
          aria-label={`Удалить товар ${product.name}`}
          onClick={deleteFromCart}
        />
      </td>
    </tr>
  );
});

interface ItemInfoProps {
  name: string;
  count: number;
  price: number;
}

interface LogoProps {
  picture: string;
  name: string;
}

const Logo = memo<LogoProps>(({ name, picture }) => (
  <td className={styles.bycontent}>
    <WithoutPrint>
      <img className={styles.icon} src={picture} alt={`Логотип ${name}`} height={80} width={80} />
    </WithoutPrint>
  </td>
));

const ItemInfo = memo<ItemInfoProps>(({ name, count, price }) => (
  <td className={`${styles.description}`}>
    <h3 className={styles.name}>{name}</h3>

    <WithoutPrint>
      <p className={styles.max}>Всего штук: {count}</p>
    </WithoutPrint>

    <Amount extraClass={styles.price} amount={price} />
  </td>
));

const styles = css`
  .item {
    white-space: nowrap;
  }

  .icon {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }

  .row {
    padding: 0 16px;
  }

  .description {
    width: 100%;
  }

  .name {
    margin: 0 0 4px;

    font-size: 20px;
  }

  .max {
    margin: 0 0 8px;

    font-size: 14px;
  }

  .price {
    font-size: 18px;
  }

  .total {
    font-weight: 600;
  }

  .delete {
    width: 32px;
    height: 32px;

    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath d='M962.6 830.4L632.1 500l330.5-330.5A93.4 93.4 0 1 0 830.4 37.4L500 367.8 169.5 37.4A93.5 93.5 0 0 0 37.4 169.5L367.8 500 37.4 830.4a93.5 93.5 0 0 0 132.1 132.2L500 632.1l330.4 330.5a93.5 93.5 0 0 0 132.2-132.2z'/%3E%3C/svg%3E");
  }
`;
