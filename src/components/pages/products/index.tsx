import { lazy } from '../../partial/lazy';

export const ProductsList = lazy(() => import('./products-list'), 'ProductsList');
