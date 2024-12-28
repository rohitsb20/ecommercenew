import {create} from "zustand"
import { roundoff } from "../utils"
import { OrderItem } from "../models/orderModel"
import { persist } from "zustand/middleware"


type Cart = {
    itemsPrice:number,
    taxPrice:number,
    shippingPrice:number,
    totalPrice:number,
    items: OrderItem[]
}