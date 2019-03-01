import React, { memo } from 'react';
import { css } from 'astroturf';
import { WithoutPrint } from './partial/print';
import { Link } from './partial/link';

export const TopBar = memo(() => {
  return (
    <WithoutPrint>
      <nav className={styles.header}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Список товаров</Link>
          </li>

          <li className={styles.item}>
            <Link to="/cart">Корзина</Link>
          </li>
        </ul>
      </nav>
    </WithoutPrint>
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

  .list {
    display: flex;
    justify-content: space-between;

    padding: 0;
    margin: 0;

    list-style: none;
  }

  .item {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;
