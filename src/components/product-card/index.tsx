import React from 'react';
import { Product } from 'stores/products';

export interface ProductCardProps {
  product: Product;
}

export interface ProductCardState {
}

export default class ProductCard extends React.PureComponent<ProductCardProps, ProductCardState> {
  constructor(props: ProductCardProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        
      </div>
    );
  }
}
