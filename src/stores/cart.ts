import { History, IHistory } from 'core/history';
import { HistoryEmitter } from 'core/history-emitter';
import { HistoryProperty, propertyWithHistory } from 'core/utils';
import { Coupon } from './coupons';
import { Property } from 'kefir';
import { fromPersistentStorage } from 'models/persistent-storage';
import { produce } from 'immer';

export type CartState = {
  items: CartItem[];
  coupon?: Coupon['id'];
};

export type CartItem = {
  id: number;
  count: number;
};

export class Cart implements IHistory {
  readonly persistentStorageKey = 'cart';
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
    [this.pCart, this._eCart, this.history] = propertyWithHistory<CartState>(
      fromPersistentStorage(this.persistentStorageKey, { items: [] })
    );

    this.pCurrentCart = this.pCart.map(([current]) => current);
  }

  updateCount = (id: number, count: number) => {
    this._eCart.patch(state =>
      produce(state, draft => {
        const indexOfItem = draft.items.findIndex(item => item.id === id);

        if (indexOfItem !== -1) {
          draft.items[indexOfItem].count = count;
        }
      })
    );
  };

  addToCart = (itemOrID: number | CartItem) => {
    this._eCart.patch(state =>
      produce(state, draft => {
        draft.items.push(typeof itemOrID === 'object' ? itemOrID : { id: itemOrID, count: 1 });
      })
    );
  };

  removeFromCart = (id: number) => {
    this._eCart.patch(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));
  };

  addCoupon = (couponID: Coupon['id']) => {
    this._eCart.patch(state =>
      produce(state, draft => {
        draft.coupon = couponID;
      })
    );
    
  };

  removeCoupon = () => {
    this._eCart.patch(({ coupon, ...rest }) => ({ ...rest }));
  };
}
const cart = new Cart();

export default cart;
