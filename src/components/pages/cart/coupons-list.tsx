import { WithoutPrint } from 'components/partial/print';
import { useImmediateProperty } from 'hooks/useProperty';
import React, { useState } from 'react';
import cart from 'stores/cart';
import coupons from 'stores/coupons';

/**
 * Компонент с выбором купонов
 */
export const CouponsList = React.memo(() => {
  const [couponsList] = useImmediateProperty(coupons.pCoupons);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!couponsList) return;

    if (inputValue.length === 0) {
      setError('Введите код купона');
      return;
    }

    const hasCoupon = !!couponsList.find(coupon => coupon.id === inputValue);

    if (!hasCoupon) {
      setError('Купон не найден');
      return;
    }

    cart.addCoupon(inputValue);
    setInputValue('');
  }

  return couponsList ? (
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
        <datalist id="coupons">
          {couponsList.map(coupon => (
            <option key={coupon.id} value={coupon.id} />
          ))}
        </datalist>

        <button type="submit">Применить купон</button>

        {error && <p>{error}</p>}
      </form>
    </WithoutPrint>
  ) : null;
});
