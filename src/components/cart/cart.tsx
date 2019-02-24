import { css } from 'astroturf';
import { WithoutPrint, WithPrint } from 'components/partial/print';
import { useProperty } from 'hooks/useProperty';
import React, { memo } from 'react';
import cart from 'stores/cart';
import { MemoizedButton } from '../partial/button';
import { CartTotal } from './cart-total';
import { CouponsList } from './coupons-list';
import { ProductCartList } from './product-cart-list';
import { SelectedCoupon } from './selected-coupon';

/**
 * Страница с корзиной
 */
export const Cart = React.memo(() => {
  return (
    <>
      <header className={styles.header}>
        <WithoutPrint>
          <h1>Корзина</h1>
        </WithoutPrint>

        <WithPrint>
          <h1>Чек</h1>
        </WithPrint>

        <div className={styles.actions}>
          <UndoRedo />
        </div>
      </header>

      <CartContent />
    </>
  );
});

const UndoRedo = memo(() => {
  const [[canUndo, canRedo]] = useProperty<[boolean, boolean], never>(
    cart.pCart
      .map(([_, prev, future]) => [prev.length > 0, future.length > 0] as [boolean, boolean])
      .skipDuplicates((v1, v2) => v1[0] === v2[0] && v1[1] === v2[1]),
    [false, false]
  );

  return (
    <>
      <MemoizedButton
        extraClass={styles.undo}
        disabled={!canUndo}
        buttonStyle={'null'}
        onClick={cart.history.undo}
        aria-label={'Отменить'}
        title={'Отменить'}
      />
      <MemoizedButton
        disabled={!canRedo}
        extraClass={styles.redo}
        buttonStyle={'null'}
        onClick={cart.history.redo}
        aria-label={'Вернуть'}
        title={'Вернуть'}
      />
    </>
  );
});

const CartContent = memo(() => {
  return (
    <>
      <ProductCartList />
      <CouponsList />
      <SelectedCoupon />
      <CartTotal />
      <PrintButton />
    </>
  );
});

const PrintButton = () => {
  const [hasProducts] = useProperty(
    cart.pCurrentCart.map(({ items }) => items.length > 0).skipDuplicates(),
    false
  );

  return hasProducts ? <MemoizedButton onClick={window.print}>Распечатать чек</MemoizedButton> : null;
};

const styles = css`
  .header {
    display: flex;
    align-items: center;
  }

  .actions {
    margin-left: auto;
  }

  .undo {
    width: 48px;
    height: 48px;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='497.3' height='497.3'%3E%3Cpath d='M248.6 89.3V0L121.1 127.5 248.6 255V140.2c84.2 0 153 68.9 153 153 0 84.2-68.8 153-153 153-84.1 0-153-68.8-153-153h-51c0 112.3 91.8 204 204 204s204-91.7 204-204-91.8-204-204-204z'/%3E%3C/svg%3E");
  }

  .redo {
    width: 48px;
    height: 48px;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='485.2' height='485.2'%3E%3Cpath d='M242.6 424.6A136.6 136.6 0 0 1 106.1 288c0-75.3 61.3-136.5 136.5-136.5v91l151.6-121.3L242.6 0v91A197.3 197.3 0 0 0 45.5 288a197.3 197.3 0 0 0 197.1 197.2 197.3 197.3 0 0 0 197.1-197.1h-60.6c0 75.3-61.2 136.5-136.5 136.5z'/%3E%3C/svg%3E");
  }

  .undo,
  .redo {
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;

    border: none;
  }
`;
