import { ProductsInCart, ProductInCart } from './products-in-cart';
import { Coupon } from 'stores/coupons';
import { ObjectMap } from 'types';

/**
 * Расчитывает величину скидки на основании текущей корзины и выбранного купона
 *
 * @export
 * @param {ProductsInCart} productsInCart состояние корзины, связанное с информацией о товаре и купоне
 * @param {number} cartAmount сумма корзины
 * @returns {number} величину скидки
 */
export function calculateDiscount(productsInCart: ProductsInCart, cartAmount: number): number {
  const { coupon, items } = productsInCart;
  if (!coupon) return 0;

  return Math.min(byCouponKind[coupon.kind]({ coupon, items, cartAmount }), cartAmount);
}

/**
 * Маппер вид купона - функция, которая расчитывает сумму скидки
 */
const byCouponKind: ObjectMap<Coupon['kind'], (params: CouponKindParams) => number> = {
  cart: getDiscountFromCart,
  product: getDiscountFromProduct,
};

/**
 * Маппер тип купона - функция которая расчитывает величину скидки
 */
const byCouponType: ObjectMap<Coupon['type'], (params: CouponTypeParams) => number> = {
  fixed: getFixedAmount,
  percent: getPercentAmount,
};

type CouponKindParams = {
  coupon: Coupon;
  items: ProductInCart[];
  cartAmount: number;
};

type CouponTypeParams = {
  coupon: Coupon;
  amount: number;
};

function getDiscountFromCart({ coupon, cartAmount }: CouponKindParams) {
  return byCouponType[coupon.type]({ coupon, amount: cartAmount });
}

function getDiscountFromProduct({ items, coupon }: CouponKindParams) {
  if (coupon.kind !== 'product') return 0;

  const couponProduct = items.find(item => item.id === coupon.productID);

  if (couponProduct) {
    return (
      byCouponType[coupon.type]({ coupon, amount: couponProduct.productInfo.price }) * couponProduct.count
    );
  }

  return 0;
}

function getFixedAmount({ coupon }: CouponTypeParams) {
  return coupon.amount;
}

function getPercentAmount({ amount, coupon }: CouponTypeParams) {
  return amount * (coupon.amount / 100);
}
