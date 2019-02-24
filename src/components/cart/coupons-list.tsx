import React, { useState, memo } from 'react';
import { useProperty } from 'hooks/useProperty';
import coupons from 'stores/coupons';
import cart from 'stores/cart';
import { WithoutPrint } from 'components/partial/print';

/**
 * Компонент с выбором купонов
 */
export const CouponsList = React.memo(() => {
  const [couponsMap] = useProperty(coupons.pCouponsMap, undefined);

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!couponsMap) return;

    if (inputValue.length === 0) {
      setError('Введите код купона');
      return;
    }

    const hasCoupon = !!couponsMap[inputValue];

    if (!hasCoupon) {
      setError('Купон не найден');
      return;
    }

    cart.addCoupon(inputValue);
    setInputValue('');
  }

  return couponsMap ? (
    <WithoutPrint>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="coupons-input">{'Использовать купон '}</label>

        <input
          list="coupons"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setError(undefined);
          }}
          id="coupons-input"
          name="couponsInput"
        />
        <List id="coupons" />

        <button type="submit">Применить купон</button>
        {error && <p>{error}</p>}
      </form>
    </WithoutPrint>
  ) : null;
});

const List = memo<{ id: string }>(({ id }) => {
  const [couponsList] = useProperty(coupons.pCoupons, undefined);

  return couponsList ? (
    <datalist id={id}>
      {couponsList.map(({ id }) => (
        <option key={id} value={id} />
      ))}
    </datalist>
  ) : null;
});
