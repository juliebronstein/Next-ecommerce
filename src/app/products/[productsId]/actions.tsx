"use server"

import createCarts, { getCart } from "@/lib/db/carts"
import prisma from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"




const incrementProductQuantity=async(productId:number)=>{
    const id_=Number(productId)||0
    const cart= await getCart() ?? await createCarts()
    const articleInCart=cart.items.find(item=>item.productid===id_)
    if(articleInCart){
        await prisma.cartItem.update({
            where:{id:articleInCart.id},
            data:{quantity:{increment:1}}
        })
    }else{
        await prisma.cartItem.create({
            data:{
                cartId:cart.id,
                productid:productId,
                quantity:1
            }
        })
    }

revalidatePath("/products/[productId]")
}
export default incrementProductQuantity

