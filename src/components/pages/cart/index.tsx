import { lazy } from '../../partial/lazy';

export const Cart = lazy(() => import('./cart'), 'Cart');
