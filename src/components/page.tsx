import { css } from 'astroturf';
import React, { Suspense, StrictMode } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ErrorCatcher } from './partial/error-catcher';
import { SaveToStorage } from './partial/save-to-storage';
import { ScrollToTop } from './partial/scroll-to-top';
import { TopBar } from './topbar';
import { Cart } from './pages/cart';
import { ProductsList } from './pages/products';
import { NoMatch } from './pages/404';

const maybeRoutes = document.getElementById('routes');
const routes: { [key: string]: string } = maybeRoutes ? JSON.parse(maybeRoutes.innerHTML).routes : {};

const Registry = {
  ProductsList: ProductsList,
  Cart: Cart,
};

export const Page = () => (
  <StrictMode>
    <Router>
      <div className={styles.layout}>
        <TopBar />

        <main className={styles.main}>
          <ErrorCatcher>
            <Suspense fallback="Загрузка...">
              <Switch>
                {Object.keys(routes).map(component => (
                  <Route path={routes[component]} exact={routes[component] === '/'}>
                    {React.createElement(Registry[component])}
                  </Route>
                ))}

                <Route>
                  <NoMatch />
                </Route>
              </Switch>
            </Suspense>
          </ErrorCatcher>
        </main>

        <SaveToStorage />
        <ScrollToTop />
      </div>
    </Router>
  </StrictMode>
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
