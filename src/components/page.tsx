import React, { useState } from 'react';
import { ProductsList } from 'components/products-list';
import { css } from 'astroturf';
import { TopBar } from './topbar';
import { Cart } from './cart';

export type PageType = 'list' | 'cart';

export const Page = () => {
  const [page, setPage] = useState<PageType>('list');

  return (
    <div className={styles.layout}>
      <TopBar onNavigate={setPage} />
      <main className={styles.main}>{page === 'list' ? <ProductsList /> : <Cart />}</main>
    </div>
  );
};

const styles = css`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  :root {
    --gap: 30px;
  }

  .layout {
    min-width: 320px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .main {
    padding: 0 calc(var(--gap) / 2);
  }
`;
