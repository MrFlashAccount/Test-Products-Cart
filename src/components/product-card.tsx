import React, { memo } from 'react';
import { Product } from 'stores/products';
import { css } from 'astroturf';
import cart from 'stores/cart';
import useProperty from 'hooks/useProperty';

const styles = css`
  .card {
    flex-direction: column;
    padding: 16px;

    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .title {
    margin-bottom: 4px;

    color: #414554;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0241em;
  }

  .addButton {
    padding: 8px;
    width: 100%;

    color: #fff;
    background: #17c486;

    font-size: 1rem;
    line-height: 24px;
    font-weight: 500;
    font-family: inherit;
    white-space: nowrap;

    border-radius: 100px;
    border: 1px solid transparent;

    transition: color 0.3s, background-color 0.3s;

    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

/**
 * Карточка товара
 */
export const ProductCard = memo<{ product: Product }>(({ product }) => {
  const [inCart] = useProperty(
    cart.pCart.map(([current]) => !!current.find(({ id }) => id === product.id)).skipDuplicates(),
    false
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{product.name}</h3>

      {!inCart ? (
        <button className={styles.addButton} onClick={() => cart.addToCart(product.id)}>
          Добавить в корзину
        </button>
      ) : (
        'Уже в корзине'
      )}
    </div>
  );
});
