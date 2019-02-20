import React, { memo } from 'react';
import { css } from 'astroturf';
import { PageType } from './page';

export const TopBar = memo<{ onNavigate: (type: PageType) => void }>(({ onNavigate }) => {
  return (
    <header className={styles.header}>
      <button onClick={() => onNavigate('list')}>Список товаров</button>
      <button onClick={() => onNavigate('cart')}>Корзина</button>
    </header>
  );
});

const styles = css`
  .header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;

    padding: 16px;

    background: #fff;
    border-bottom: 1px solid #e4e6ec;

    z-index: 1;
  }
`;
