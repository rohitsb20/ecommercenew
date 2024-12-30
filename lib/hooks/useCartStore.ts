import { create } from "zustand";
import { roundoff } from "../utils";
import { OrderItem } from "../models/orderModel";
import { persist } from "zustand/middleware";

type Cart = {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  items: OrderItem[];
  increase: (item: OrderItem) => void;
  decrease: (item: OrderItem) => void;
};

const initialState: Omit<Cart, "increase" | "decrease"> = {
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  items: [],
};

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = roundoff(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = roundoff(itemsPrice > 100 ? 0 : 100);
  const taxPrice = roundoff(itemsPrice * 0.15);
  const totalPrice = roundoff(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      ...initialState,
      increase: (item: OrderItem) =>
        set((state) => {
          const exist = state.items.find((x) => x.slug === item.slug);
          const updatedItems = exist
            ? state.items.map((x) =>
                x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
              )
            : [...state.items, { ...item, qty: 1 }];

          const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
            calcPrice(updatedItems);
          return {
            items: updatedItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          };
        }),
      decrease: (item: OrderItem) =>
        set((state) => {
          const exist = state.items.find((x) => x.slug === item.slug);
          if (!exist) return state;
          const updatedItems =
            exist.qty === 1
              ? state.items.filter((x) => x.slug !== item.slug)
              : state.items.map((x) =>
                  x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x
                );

          const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
            calcPrice(updatedItems);
          return {
            items: updatedItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          };
        }),
    }),
    { name: "cartstore" }
  )
);

export default function useCartService() {
  const {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    items,
    increase,
    decrease,
  } = useCartStore();

  return {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    items,
    increase,
    decrease,
  };
}
