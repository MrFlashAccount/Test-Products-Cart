import { Store } from './store';
import { Property } from 'kefir';
import { property } from 'core/utils';

export type Product = {
  id: number;
  count: number;
  name: string;
};

const productsList: Product[] = [
  {
    id: 0,
    name: 'Bolton',
    count: 0,
  },
  {
    id: 1,
    name: 'Millie',
    count: 16,
  },
  {
    id: 2,
    name: 'William',
    count: 16,
  },
  {
    id: 3,
    name: 'Bernard',
    count: 15,
  },
  {
    id: 4,
    name: 'England',
    count: 3,
  },
  {
    id: 5,
    name: 'Schmidt',
    count: 4,
  },
  {
    id: 6,
    name: 'Karina',
    count: 9,
  },
  {
    id: 7,
    name: 'Alvarado',
    count: 12,
  },
  {
    id: 8,
    name: 'Marcia',
    count: 14,
  },
  {
    id: 9,
    name: 'Julia',
    count: 17,
  },
  {
    id: 10,
    name: 'Tucker',
    count: 7,
  },
  {
    id: 11,
    name: 'Morrison',
    count: 14,
  },
];
class Products extends Store {
  pProducts: Property<Product[], never>;

  static getInstance() {
    return super.getInstance() as Products;
  }

  load() {
    [this.pProducts] = property(productsList);
  }
}

export const products = Products.getInstance();

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
