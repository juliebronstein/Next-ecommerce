"use server"

import createCarts, { getCart } from "@/lib/db/carts"
import prisma from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"




const incrementProductQuantity=async(productId:string)=>{
    const cart= await getCart() ?? await createCarts()
    const articleInCart=cart.items.find(item=>item.productid===productId || 0)
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

