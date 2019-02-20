import { Property } from 'kefir';
import { property } from 'core/utils';
import data from 'data/products.json';

export type Product = {
  id: number;
  picture: string;
  price: number;
  count: number;
  name: string;
};

class Products {
  pProducts: Property<Product[], never>;

  constructor() {
    [this.pProducts] = property<Product[], never>(data);
  }
}

export const products = new Products();
