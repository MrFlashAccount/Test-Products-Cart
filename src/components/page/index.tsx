import React from 'react';
import ProductsList from 'components/products-list';

export interface PageProps {}

export default class Page extends React.PureComponent<PageProps> {
  public render() {
    return (
      <main>
        <ProductsList />
      </main>
    );
  }
}
