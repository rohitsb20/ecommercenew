import React from "react";
import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";

import AddToCart from "@/components/AddToCart";

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = data.products.find((x) => x.slug === params.slug);

  if (!product) {
    return (
      <h1 className="text-3xl font-semibold text-center">product not found</h1>
    );
  }
  return (
    <div className="min-h-screen p-2">
      <Button variant="outline">
        <Link href="/">Back to Home</Link>
      </Button>
      <div className="mt-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-secondary-foreground">
              Product Details
            </CardTitle>
          </CardHeader>

          <div className="flex flex-col md:flex-row lg:flex-row justify-start gap-4 p-4 items-center">
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                style={{ width: 400, height: 400 }}
                className="object-cover w-full h-68 rounded-lg mt-2"
              ></Image>
            </div>
            <CardContent>
              <div>
                <CardFooter>
                  <div className="flex flex-col gap-y-3">
                    <h1 className="text-2xl text-secondary-foreground font-normal itlaic ">
                      {product.name}
                    </h1>

                    <p>
                      Brand:{" "}
                      <span className="text-primary">{product.brand}</span>{" "}
                    </p>
                    <hr className="h-1 bg-primary" />

                    <CardDescription>{product.description}</CardDescription>
                    <div className="flex items-center gap-2 md:flex-col">
                      <p className="text-sm">
                        Rating:{" "}
                        <span className="text-green-600">{product.rating}</span>
                      </p>
                      <p>
                        Price:{" "}
                        <span className="text-xl">
                          {product.price}{" "}
                          <span className="text-primary">$</span>
                        </span>{" "}
                      </p>
                    </div>
                    {/* <Button type="button">
                        Add to Cart
                    </Button> */}

                    {product.countInStock !== 0 && (
                      <div >
                        <AddToCart
                          item={{
                            ...product,
                            qty: 0,
                            color: "",
                            size: "",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardFooter>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

