import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/models/productModel";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductItems({ product }: { product: Product }) {
  return (
    <div className="drop-shadow-lg">
      <Card className=" card flex flex-col gap-y-2">
        <CardContent>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover w-full h-68 rounded-sm mt-2"
            ></Image>
          </Link>
        </CardContent>
        <CardHeader>
          <Link href={`/product/${product.slug}`}>
            <CardTitle>{product.name}</CardTitle>
          </Link>

          <CardDescription>{product.description}</CardDescription>
          <hr className="h-1 bg-primary " />
        </CardHeader>
        <CardFooter className="flex flex-col">
          <p className="text-primary">Brand: {product.brand}</p>
          <p>Price: {product.price}$</p>
        </CardFooter>
      </Card>
    </div>
  );
}
