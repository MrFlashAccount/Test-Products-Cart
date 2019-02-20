import data from 'data/coupons.json';
import { Property } from 'kefir';
import { property } from 'core/utils';

export type Coupon = CartCoupon | ProductCoupon;

export type CartCoupon = CommonCouponFields & { kind: 'cart' };
export type ProductCoupon = CommonCouponFields & { kind: 'product'; productID: number };

type CommonCouponFields = {
  /**
   * Код купона
   *
   * @type {string}
   */
  id: string;
  /**
   * Величина скидки
   *
   * @type {number}
   */
  amount: number;
  /**
   * Тип скидки: абсолютное число, либо процент
   *
   * @type {('fixed' | 'percent')}
   */
  type: 'fixed' | 'percent';
};

export class Coupons {
  pCoupons: Property<Coupon[], never>;

  constructor() {
    [this.pCoupons] = property<Coupon[]>(data as Coupon[]);
  }
}

const coupons = new Coupons();

export default coupons;
