import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="w-[100%] flex justify-between items-center p-3">
      <Link
        href="/"
        className="font-semibold text-3xl text-green-400 italic cursor-pointer select-none"
      >
        WearGlam
      </Link>
      <div className="flex gap-x-3">
        <Button variant="default">
          <Link
            href="/cart"
            className="p-2 text-lg tracking-wide font-semibold"
          >
            Cart
          </Link>
        </Button>
        <Button variant="default">
          <Link href="/signin" className=" text-lg tracking-wide font-semibold">
            SignIn
          </Link>
        </Button>
      </div>
    </div>
  );
}
