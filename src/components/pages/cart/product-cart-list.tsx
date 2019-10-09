import React, { memo } from 'react';
import { ProductInCart } from 'models/products-in-cart';
import { ProductCartItem } from './product-cart-item';
import { css } from 'astroturf';
import { WithoutPrint } from 'components/partial/print';

interface ProductCartListProps {
  products: ProductInCart[];
}

export const ProductCartList = memo<ProductCartListProps>(({ products }) => {
  return (
    <section>
      <table className={styles.list}>
        <tbody>
          {products.length > 0 ? (
            products.map(product => <ProductCartItem key={product.id} product={product} />)
          ) : (
            <Empty />
          )}
        </tbody>
      </table>
    </section>
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
