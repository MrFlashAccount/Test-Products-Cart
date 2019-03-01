import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

/**
 * Возвращает скролл наверх при смене страницы
 */
export const ScrollToTop = withRouter(({ location, children }) => {
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return <>{children}</>;
});
