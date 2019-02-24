import { Property } from 'kefir';
import { property } from 'core/utils';
import data from 'data/products.json';
import { KeyMap } from 'types';
import { arrayToObject } from 'helpers/array-to-object';

export type Product = {
  id: number;
  picture: string;
  price: number;
  count: number;
  name: string;
};

export class Products {
  pProducts: Property<Product[], never>;
  pProductsMap: Property<KeyMap<Product>, never>;

  constructor() {
    [this.pProducts] = property<Product[], never>(data);
    this.pProductsMap = this.pProducts.map(p => arrayToObject(p, 'id'));
  }
}

export const products = new Products();
