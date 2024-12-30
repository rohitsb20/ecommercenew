"use client";
import React, { useEffect, useState } from "react";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function CardDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return <></>;
  }
  return (
    <>
      <h1 className=" pb-5 text-2xl font-semibold text-secondary-foreground">
        Shipping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-xl text-red-500 font-medium text-center flex flex-col items-center gap-y-2">
          Cart is Empty
          <Button
            className="text-xl text-black font-medium w-fit"
            variant="outline"
          >
            <Link href="/">Go to Shopping</Link>
          </Button>
        </div>
      ) : (
        <div>
          <div>
            {/* table starts */}
            <Table>
              <TableCaption>A list of your recent products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[200px]">Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link href={"/product/${item.slug}"}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                        ></Image>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="text-base">{item.name}</span>
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Button
                        variant="outline"
                        className="text-lg"
                        type="button"
                        onClick={() => decrease(item)}
                      >
                        -
                      </Button>
                      <span className="px-2 text-black font-bold">
                        {item.qty}
                      </span>
                      <Button
                        variant="outline"
                        className="text-lg"
                        type="button"
                        onClick={() => increase(item)}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell className="text-lg font-semibold">
                      {item.price}$
                    </TableCell>
                    <TableCell className="text-right text-xl font-bold">
                      {itemsPrice}$
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* table ends */}

            <div className="flex justify-center mt-4">
              <Button>
                <Link href="/checkout"> Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
