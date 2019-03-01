import React, { memo } from 'react';
import { Product } from 'stores/products';
import { css } from 'astroturf';
import cart from 'stores/cart';
import { useImmediateProperty } from 'hooks/useProperty';
import { Button } from '../partial/button';
import { Amount } from '../partial/amount';

/**
 * Карточка товара
 */
export const ProductCard = memo<{ product: Product }>(({ product }) => {
  return (
    <div className={styles.card}>
      <img className={styles.logo} src={product.picture} alt={product.name} height={150} />

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>

        <Amount amount={product.price} extraClass={styles.price} />
        <InCartBlock product_id={product.id} />
      </div>
    </div>
  );
});

const InCartBlock = memo<{ product_id: number }>(({ product_id }) => {
  const [inCart] = useImmediateProperty(
    cart.pCart.map(([current]) => !!current.items.find(({ id }) => id === product_id)).skipDuplicates()
  );

  return inCart ? (
    <Button key="cart" buttonStyle="null" onClick={() => cart.removeFromCart(product_id)}>
      Удалить из корзины
    </Button>
  ) : (
    <Button key="cart" onClick={() => cart.addToCart(product_id)}>
      Добавить в корзину
    </Button>
  );
});

const styles = css`
  .card {
    display: flex;
    flex-direction: column;

    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .logo {
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  .title {
    margin: 8px 0 8px;

    color: #414554;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0241em;
  }

  .price {
    margin-bottom: 16px;
  }
`;
