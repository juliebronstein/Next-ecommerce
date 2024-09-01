"use server"

import createCarts, { getCart } from "@/lib/db/carts"
import prisma from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

const setProductQuantity=async(productId:number,quantity:number)=>{
    const cart= await getCart() ?? await createCarts()
    const articleInCart=cart.items.find(item=>item.productid===productId)
    if(quantity===0){
       if(articleInCart){
        await prisma.cartItem.delete({
            where:{id:articleInCart?.id }
        })
       }
    }else{
        if(articleInCart){
            await prisma.cartItem.update({where:{id:articleInCart?.id},
                data:{
                    quantity
                }})
        }else{
            await prisma.cartItem.create({
                data:{
                    cartId:cart.id,
                    productid:productId,
                    quantity

                }
            })
        }
    }
      

revalidatePath("/cart")

}
export default setProductQuantity