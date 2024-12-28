import React from 'react';
import data from "@/lib/data";
import ProductItems from '@/components/products/productItems'
export default function Home() {
 return (
   
     <div className="min-h-screen p-2">
       <div className="mb-3">
         <h1 className="text-2xl text-black font-semibold italic ">
           Latest Products
         </h1>
       </div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
         {data.products.map((product) => (
           <ProductItems key={product.slug} product={product} />
         ))}
       </div>
     </div>
   
 );
}
