"use client"
import {cartItemWithProduct} from "@/lib/db/carts"
import fromatPrice from "@/lib/db/formatPrice"
import Image from "next/image"
import Link from "next/link"
import setProductQuantity from "./action"
import { useState, useTransition } from "react"

export const metadata={
    title:"Your Cart-Ecommerce"
}
interface CartEntityProbs {
    cartItem:cartItemWithProduct,   
    setProductQuantity:(productId:number,quantity:number)=>Promise<void>
}

const CartEntity=({cartItem:{product,quantity}}:CartEntityProbs)=>{

    const [isPending,startTransition]=useTransition()
    const[succes,setSucces]=useState(false)
    const quantityOptions:JSX.Element[]=[]
    for(let i=1;i<100;i++){
        quantityOptions.push(
      <option value={i} key={i}>
            {i}
        </option>
        )
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
            <Image 
           src={product.imageUrl||""} 
           alt={product.name || ""}
           width={400} 
           height={400} 
           placeholder="blur" 
           blurDataURL="/assets/images/loader.svg" 
           loading="lazy"  
           className="rounded-lg" 
           quality={100}
          />
          <div>
            <Link href={`products/${product.idproduct}`} className="font-bold">
            {product.name}
            </Link>
            <div>Price:{fromatPrice(product.price||0)} </div>
            <div className="flex my-1 gap-2 items-center">Quantity:
                <select className="select select-bordered w-full max-w-[80px]"
                defaultValue={quantity}
                onChange={e=>{
                    const newquantity=parseInt(e.target.value)
                   startTransition(async()=>{
                    setSucces(false)
                   await setProductQuantity(product.idproduct,newquantity)
                    setSucces(true)
                   })
                }} 
                ><option value={0}> 0 (Remove)</option>
                    {quantityOptions}
                </select>
                {isPending ? <span className="loading loading-spinner loading-sm"></span>:
                 !isPending && succes && <div className="text-success">changed</div>}
            </div>
            <div className="">Total:{fromatPrice(quantity * (product.price||0))} </div>
            
          </div>
            </div>
                <div className="divider"/>
        </div>
    )
}
export default CartEntity