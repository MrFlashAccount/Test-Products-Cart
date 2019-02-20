import { History, IHistory } from 'core/history';
import { HistoryEmitter } from 'core/history-emitter';
import { HistoryProperty, propertyWithHistory } from 'core/utils';
import { Coupon } from './coupons';
import { Property } from 'kefir';

export type CartState = {
  items: CartItem[];
  coupon?: Coupon['id'];
};

export type CartItem = {
  id: number;
  count: number;
};

class Cart implements IHistory {
  /**
   * Поток со всей информацией о корзине, включая ее прошлое и будущее
   *
   * @type {HistoryProperty<CartState, never>}
   */
  pCart: HistoryProperty<CartState, never>;
  /**
   * Поток с текущим состоянием корзины
   *
   * @type {Property<CartState, never>}
   */
  pCurrentCart: Property<CartState, never>;
  history: History;

  private _eCart: HistoryEmitter<CartState>;

  constructor() {
    [this.pCart, this._eCart, this.history] = propertyWithHistory<CartState>({ items: [] });
    this.pCurrentCart = this.pCart.map(([current]) => current);

    // для отслеживания состояния корзины в консоли.
    this.pCart.spy('Cart');
  }

  updateCount(id: number, count: number) {
    this._eCart.patch(state => {
      const { items } = state;
      const indexOfItem = items.findIndex(item => item.id === id);

      if (indexOfItem !== -1) {
        items[indexOfItem].count = count;
      }

      return { ...state, items };
    });
  }

  addToCart(itemOrID: number | CartItem) {
    this._eCart.patch(state => ({
      ...state,
      items: [...state.items, typeof itemOrID === 'object' ? itemOrID : { id: itemOrID, count: 1 }],
    }));
  }

  removeFromCart(id: number) {
    this._eCart.patch(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));
  }

  addCoupon(couponID: Coupon['id']) {
    this._eCart.patch(state => ({ ...state, coupon: couponID }));
  }

  removeCoupon() {
    this._eCart.patch(({ coupon, ...rest }) => ({ ...rest }));
  }
}

const cart = new Cart();

export default cart;
