import { cookies } from "next/headers"
import prisma from "./prisma"
import { Cart, CartItem, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUser from "./user"

export type cartWithProduct=Prisma.CartGetPayload<{
    include:{items:{include:{product:true}}} 
}>

export type cartItemWithProduct=Prisma.CartItemGetPayload<{
    include:{product:true} 
}>
export type shoppingCart= cartWithProduct &{
    size:number,
    subtotals:number
}

export async function getCart(): Promise<shoppingCart|null> {
    const session=await getServerSession(authOptions)
    let cart:cartWithProduct | null
    const user=await getUser({session})
    const UserId_=user?.id
    if(session){
        cart=await prisma.cart.findFirst({
            where:{userId:user?.id},
            include:{items:{include:{product:true}}}
        })
    }else{
        const localCartId=Number(cookies().get("localCartId")?.value)
        cart=localCartId ?  
           await prisma.cart.findUnique({where:{id:localCartId},
               include:{items:{include:{product:true}}} })
           :null
    }

if(!cart) return null

// return {
//     ...cart,
//     size: cart.items.reduce((total, item) => {
//       const price = item.product.price ?? 0; // Use nullish coalescing for price
//       return total + item.quantity * price;
//     }, 0),
//   };
return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotals: cart.items.reduce((total, item) => {
      const price = item.product.price ?? 0;
      return total + item.quantity * price;
    }, 0),UserId_
  };
  
}

const createCarts=async():Promise<shoppingCart> =>{
    const session=await getServerSession(authOptions)
    let newCart:Cart 
    const user=await getUser({session})
    if(session){
        newCart=await prisma.cart.create({
            data: {userId:user?.id },
        })
    }else{
        newCart=await prisma.cart.create({
             data: {},
        })
    }
 cookies().set("localCartId",newCart.id.toString(), {
    path: "/",
    maxAge: 3600*24*30, // Expires after 1mounth
    sameSite: true,
  })
 return{
    ...newCart,
    items:[],
    size:0,
    subtotals:0
 }
}
export const megrgeAnonymousCartIntoUserCart=async()=>{
    const session=await getServerSession(authOptions)
    console.log(session)
    const user=await getUser({session})
    console.log(user)
    const userCart=await prisma.cart.findFirst({
        where:{userId:"cm0s33qk8000010gnbz8dka9q"},
        include:{items:true}
    })

    const localCartId=Number(cookies().get("localCartId")?.value)
    console.log(localCartId)
    const localCart=localCartId ?  
           await prisma.cart.findUnique({
            where:{id:localCartId},
            include:{items:true}
        }):null


  



if(!localCart) return




    await prisma.$transaction(async (tx) =>{
        if(userCart){
        const mergedItems=mergeCartItem(userCart.items,localCart?.items)
        await tx.cartItem.deleteMany({
                where:{cartId:userCart.id}
            })
            await tx.cartItem.createMany({
                data: mergedItems.map(i=>({
                    cartId:userCart.id,
                    productid:i.productid,
                    quantity:i.quantity
                }))
            })
        }else{
            await tx.cart.create({
                data:{
                    userId:user?.id,
                    items:{
                        createMany:{
                            data:localCart.items.map(i=>({
                                productid:i.productid,
                                quantity:i.quantity
                            }))
                        }
                    }
                }
            })
        }
    //    const delete_= await prisma.cart.delete({
    //         where:{id:localCartId}
    //     })
        const coocke=cookies().set("localCartId","")
    })


}

const mergeCartItem = (...cartItems: CartItem[][]) => {
    return cartItems.reduce((acc, items) => {
        items.forEach((item) => {
            const existingItem = acc.find(i => i.productid === item.productid);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
        });
        return acc;
    }, [] as CartItem[]);
};



export default createCarts
















// const mergeCartItem1 = (...cartItems: CartItem[][]) => {
//     let result = [] as CartItem[]; 
//     cartItems.forEach(items => { 
//         items.forEach(item => {
//             let existingItem = result.find(i => i.productid === item.productid); 
            
//             if (existingItem) { 
//                 existingItem.quantity += item.quantity;
//             } else { 
//                 result.push(item);
//             }
//         });
//     });
 
//     return result; 
//  };