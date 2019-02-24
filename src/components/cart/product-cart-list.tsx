import { css } from 'astroturf';
import { WithoutPrint } from 'components/partial/print';
import { useProperty } from 'hooks/useProperty';
import React, { memo } from 'react';
import cart from 'stores/cart';
import { ProductCartItem } from './product-cart-item';

export const ProductCartList = memo(() => {
  return (
    <section>
      <table className={styles.list}>
        <Content />
      </table>
    </section>
  );
});

ProductCartList['whyDidYouRender'] = true;

const Content = memo(() => {
  const [cartItems] = useProperty(cart.pCurrentCart.map(cart => cart.items), []);

  return (
    <tbody>
      {cartItems.length > 0 ? (
        cartItems.map(item => <ProductCartItem key={item.id} item={item} />)
      ) : (
        <Empty />
      )}
    </tbody>
  );
});

const Empty = memo(() => (
  <tr>
    <td className={styles.empty}>
      <WithoutPrint>Добавьте что-нибудь :)</WithoutPrint>
    </td>
  </tr>
));

const styles = css`
  .list {
    width: 100%;

    padding: 24px 0;
    margin: 0;
  }

  .item {
    padding: 12px 0;
  }

  .empty {
    padding: 128px 0;

    font-size: 18px;
    text-align: center;

    color: #9e9e9e;
  }
`;
