import { Store } from 'core/store';
import { HistoryEmitter } from 'core/HistoryEmitter';
import { Property } from 'kefir';
import { propertyWithHistory } from 'core/utils';
import { IHistorySlider } from 'core/IHistorySlider';

export type CartItem = {
  id: number;
  count: number;
};

class Cart extends Store implements IHistorySlider {
  pCart: Property<CartItem[], never>;
  private _eCart: HistoryEmitter<CartItem[]>;

  static getInstance() {
    return super.getInstance() as Cart;
  }

  protected load() {
    [this.pCart, this._eCart] = propertyWithHistory<CartItem[]>([]);
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

  undo() {
    this._eCart.undo();
  }

  redo() {
    this._eCart.redo();
  }
}

const cart = Cart.getInstance();

export default cart;
