import React from 'react';
import { ProductsList } from 'components/products/products-list';
import { css } from 'astroturf';
import { TopBar } from './topbar';
import { Cart } from './cart/cart';
import { NoMatch } from './no-match';
import { SaveToStorage } from './partial/save-to-storage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ScrollToTop } from './partial/scroll-to-top';

export const Page = () => (
  <Router>
    <div className={styles.layout}>
      <TopBar />

      <main className={styles.main}>
        <Switch>
          <Route path="/" exact component={ProductsList} />
          <Route path="/cart/" component={Cart} />
          <Route component={NoMatch} />
        </Switch>
      </main>

      <SaveToStorage />
      <ScrollToTop />
    </div>
  </Router>
);

const styles = css`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-display: swap;
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
