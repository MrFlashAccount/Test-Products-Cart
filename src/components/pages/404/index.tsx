import { lazy } from '../../partial/lazy';

export const NoMatch = lazy(() => import('./no-match'), 'NoMatch');
