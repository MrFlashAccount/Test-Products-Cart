import { History, IHistory } from 'core/history';
import { HistoryEmitter } from 'core/history-emitter';
import { Store } from 'core/store';
import { HistoryProperty, propertyWithHistory } from 'core/utils';

export type CartItem = {
  id: number;
  count: number;
};

class Cart extends Store implements IHistory {
  pCart: HistoryProperty<CartItem[], never>;
  history: History;

  private _eCart: HistoryEmitter<CartItem[]>;

  static getInstance() {
    return super.getInstance() as Cart;
  }

  constructor() {
    super();

    [this.pCart, this._eCart, this.history] = propertyWithHistory<CartItem[]>([]);

    this.pCart.spy('Cart');
  }

  updateCount(id: number, count: number) {
    this._eCart.patch(items => {
      const indexOfItem = items.findIndex(item => item.id === id);

      if (indexOfItem !== -1) {
        items[indexOfItem].count = count;
      }

      return items;
    });
  }

  addToCart(itemOrID: number | CartItem) {
    this._eCart.patch(items => [
      ...items,
      typeof itemOrID === 'object' ? itemOrID : { id: itemOrID, count: 1 },
    ]);
  }

  removeFromCart(id: number) {
    this._eCart.patch(items => items.filter(item => item.id !== id));
  }
}

const cart = Cart.getInstance();

export default cart;
