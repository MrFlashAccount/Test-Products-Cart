import { Product } from 'stores/products';
import { Property, combine, Stream } from 'kefir';
import { CartState, CartItem } from 'stores/cart';
import { Coupon } from 'stores/coupons';
import { calculateDiscount } from './discount-calculator';

export type ProductInCart = {
  productInfo: Product;
} & CartItem;

export type ProductsInCart = {
  items: ProductInCart[];
  coupon: Coupon | undefined;
};

export type CartTotal = {
  amount: number;
  discount: number;
  total: number;
};

/**
 * Мапит данные о товарах на корзину пользователя
 *
 * @param products поток продуктов
 * @param coupons поток купонов
 * @param cart поток корзины
 *
 * @returns поток, который содержит полную информацию о купоне и продуктах, которые лежат в корзине
 */
export const productsInCart = (
  products: Property<Product[], never>,
  coupons: Property<Coupon[], never>,
  cart: Property<CartState, never>
) => {
  return combine([products, coupons, cart])
    .map(([products, coupons, cart]) => ({
      items: mapProductsOnCart(products, cart.items),
      coupon: cart.coupon ? coupons.find(c => c.id === cart.coupon) : undefined,
    }))
    .toProperty();
};

/**
 * Поток расчитывает итоговую стоимость корзины
 *
 * @todo возможно, если расчет итоговой стоимости будет занимать нерационально много времени,
 *       стоит добавить мемоизацию
 * @param productsInCart поток с полной информацией о продуктах и купонах, наложенных на корзину
 *
 * @returns поток с суммой корзины
 */
export const cartTotal = (productsInCart: Stream<ProductsInCart, any>) => {
  return productsInCart
    .debounce(100)
    .map(calculateTotal)
    .skipDuplicates((prev, next) => prev.total === next.total)
    .toProperty();
};

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function mapProductsOnCart(products: Product[], cartProducts: CartItem[]): ProductInCart[] {
  return cartProducts.map(cartProduct => ({
    ...cartProduct,
    productInfo: products.find(product => product.id === cartProduct.id)!,
  }));
}

function calculateTotal(productsInCart: ProductsInCart): CartTotal {
  const amount = productsInCart.items.reduce(
    (amount, item) => (amount += item.count * item.productInfo.price),
    0
  );
  const discount = calculateDiscount(productsInCart, amount);

  return {
    amount,
    discount,
    total: amount - discount,
  };
}
