import React, { memo } from 'react';

export const Amount = memo<{ amount: number; extraClass?: string }>(({ amount, extraClass = '' }) => {
  return <span className={extraClass}>{formatter.format(amount)}</span>;
});

const formatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency',
  currencyDisplay: 'symbol',
});
