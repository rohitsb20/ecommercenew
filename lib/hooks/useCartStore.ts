import {create} from "zustand"
import { roundoff } from "../utils"
import { OrderItem } from "../models/orderModel"
// import { persist } from "zustand/middleware"


type Cart = {
    itemsPrice:number,
    taxPrice:number,
    shippingPrice:number,
    totalPrice:number,
    items: OrderItem[]
}

const initialState: Cart = {
  itemsPrice:0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  items:[]
};

export const cartStore = create<Cart>(() => initialState)

export default function useCartService(){
    const {itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  items} = cartStore()

  return {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    items,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.slug !== item.slug)
          : items.map((x) =>
              item.slug ? { ...exist, qty: exist.qty - 1 } : x
            );
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
  };
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = roundoff(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice = roundoff(itemsPrice > 100 ? 0 : 100),
    taxPrice = roundoff(Number(0.15 * itemsPrice)),
    totalPrice = roundoff(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};