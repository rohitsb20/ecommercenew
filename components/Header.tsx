import Link from "next/link";
import Menu from "./Menu";
import React from "react";


export default function Header() {
  return (
    <div className="w-[100%] flex justify-between items-center p-3">
      <Link
        href="/"
        className="font-semibold text-3xl text-green-600 italic cursor-pointer select-none"
      >
        WearGlam
      </Link>
      <Menu/>
    </div>
  );
}
