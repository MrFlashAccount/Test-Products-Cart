import React, { memo } from 'react';
import { css } from 'astroturf';
import { PageType } from './page';
import { Button } from './partial/button';
import { WithoutPrint } from './partial/print';

export const TopBar = memo<{ onNavigate: (type: PageType) => void }>(({ onNavigate }) => {
  return (
    <WithoutPrint>
      <nav className={styles.header}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Button extraClass={styles.button} buttonStyle={'null'} onClick={() => onNavigate('list')}>
              Список товаров
            </Button>
          </li>
          <li className={styles.item}>
            <Button extraClass={styles.button} buttonStyle={'null'} onClick={() => onNavigate('cart')}>
              Корзина
            </Button>
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

  .button {
    width: auto;

    font-size: 18px;
  }
`;
