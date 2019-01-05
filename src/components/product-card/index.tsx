import React from 'react';
import { Product } from 'stores/products';
import { css } from 'astroturf';
import cart from 'stores/cart';
import { GarbageCollector } from 'core/gc';

const styles = css`
  .card {
    flex-direction: column;
    padding: 16px;

    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .title {
    margin-bottom: 4px;

    color: #414554;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0241em;
  }

  .addButton {
    padding: 8px;
    width: 100%;

    color: #fff;
    background: #17c486;

    font-size: 1rem;
    line-height: 24px;
    font-weight: 500;
    font-family: inherit;
    white-space: nowrap;

    border-radius: 100px;
    border: 1px solid transparent;

    transition: color 0.3s, background-color 0.3s;

    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export interface ProductCardProps {
  product: Product;
}

export interface ProductCardState {
  /**
   * Флаг означает, находится ли товар в корзине, или нет
   *
   * @type {boolean}
   * @memberof ProductCardState
   */
  inCart: boolean;
}

/**
 * Карточка товара
 *
 * @export
 * @class ProductCard
 * @extends {React.PureComponent<ProductCardProps, ProductCardState>}
 */
export default class ProductCard extends React.PureComponent<ProductCardProps, ProductCardState> {
  private _gc: GarbageCollector;

  constructor(props: ProductCardProps) {
    super(props);

    this._gc = new GarbageCollector();

    this.state = {
      inCart: false,
    };
  }

  componentDidMount() {
    this._gc.add(
      cart.pCart
        .map(cart => !!cart.find(({ id }) => id === this.props.product.id))
        .skipDuplicates()
        .observe(inCart => this.setState({ inCart })).unsubscribe
    );
  }

  componentWillUnmount() {
    this._gc.release();
  }

  render() {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>{this.props.product.name}</h3>

        {!this.state.inCart ? (
          <button className={styles.addButton} onClick={this._addToCart}>
            Добавить в корзину
          </button>
        ) : (
          'Уже в корзине'
        )}
      </div>
    );
  }

  private _addToCart = () => {
    cart.addToCart(this.props.product.id);
  };
}
