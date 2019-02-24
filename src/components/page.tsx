import { css } from 'astroturf';
import React, { useState } from 'react';
import { ObjectMap } from 'types';
import { Cart } from './cart/cart';
import { SaveToStorage } from './partial/save-to-storage';
import { ProductsList } from './products/products-list';
import { TopBar } from './topbar';

export type PageType = 'list' | 'cart';

const componentByPageType: ObjectMap<PageType, JSX.Element> = {
  cart: <Cart />,
  list: <ProductsList />,
};

export const Page = () => {
  const [page, setPage] = useState<PageType>('list');

  return (
    <div className={styles.layout}>
      <TopBar onNavigate={setPage} />
      <main className={styles.main}>{componentByPageType[page]}</main>

      <SaveToStorage />
    </div>
  );
};

const styles = css`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
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
    padding: calc(var(--gap) / 2);
  }
`;
