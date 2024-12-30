
'use client'
import React, { useEffect } from 'react'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'

export default function CardDetails() {

    const router = useRouter()
    const {items ,itemPrice, decrease, increase} = useCartService()
    const [mount, setMount] = useState(false)
    useEffect(
        ()=>{
            setMount(true)
        },[]
    )

    if(!mount){
        return(
            <></>
        )
    }
  return (
    <>
      <h1 className="text-2xl font-semibold text-secondary-foreground">
        Shipping Cart
      </h1>
    </>
  );
}
