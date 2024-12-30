"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import useCartService from "@/lib/hooks/useCartStore";

export default function Menu() {
  const { items } = useCartService();
  const [mount, setmoount] = useState(false);
  useEffect(() => {
    setmoount(true);
  }, []);

  return (
    <div className="flex gap-x-3">
      <Button variant="default">
        <Link
          href="/cart"
          className="flex gap-x-1 text-lg tracking-wide font-semibold"
        >
          <span> Cart</span>
          <div className=" text-black px-2 rounded-xl">
            {mount && items.length != 0 && (
              <div>{items.reduce((a, c) => a + c.qty, 0)} </div>
            )}
          </div>
        </Link>
      </Button>
      <Button variant="default">
        <Link href="/signin" className=" text-lg tracking-wide font-semibold">
          SignIn
        </Link>
      </Button>
    </div>
  );
}
