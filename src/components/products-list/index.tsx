import React from 'react';
import { Product, products } from 'stores/products';
import { GarbageCollector } from 'core/gc';
import ProductCard from 'components/product-card';

export interface ProductsListProps {}

export interface ProductsListState {
  products?: Product[];
}

export default class ProductsList extends React.PureComponent<ProductsListProps, ProductsListState> {
  private _gc: GarbageCollector;

  constructor(props: ProductsListProps) {
    super(props);

    this._gc = new GarbageCollector();

    this.state = {};
  }

  componentDidMount() {
    this._gc.add(products.pProducts.observe(this._setProducts).unsubscribe);
  }

  componentWillUnmount() {
    this._gc.release();
  }

  render() {
    const { products } = this.state;

    return products ? this._renderContent(products) : null;
  }

  private _renderContent(products: Product[]) {
    return products.map(product => <ProductCard product={product} />);
  }

  private _setProducts(products: Product[]) {
    this.setState({ products });
  }
}
