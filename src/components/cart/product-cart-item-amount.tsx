import React, { memo } from 'react';
import { css } from 'astroturf';

interface ProductCartItemAmount {
  count: number;
  maxCount: number;
  updateCount: (count: number) => void;
}

export const ProductCartItemAmount = memo<ProductCartItemAmount>(({ count, maxCount, updateCount }) => {
  const minCount = 1;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;

    if (!isNaN(value)) {
      const clamped = Math.max(Math.min(maxCount, value), minCount);

      updateCount(clamped);
    }
  }

  return (
    <input
      className={styles.input}
      type="number"
      aria-label={'Количество товаров'}
      aria-valuemin={minCount}
      aria-valuenow={count}
      aria-valuemax={maxCount}
      min={minCount}
      value={count}
      max={maxCount}
      onChange={onChange}
    />
  );
});

const styles = css`
  .input {
    width: 60px;
  }
`;
