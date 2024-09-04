import { cookies } from "next/headers"
import prisma from "./prisma"
import { Cart, Prisma } from "@prisma/client"
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
 const localCartId=cookies().get("localCartId")?.value
 const id0=Number(localCartId)
const cart=localCartId ?  
    await prisma.cart.findUnique({where:{id:id0},
        include:{items:{include:{product:true}}} })
    :null
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
    }, 0),
  };
  
}

const createCarts=async():Promise<shoppingCart> =>{
    let newCart:Cart;
    const session=await getServerSession(authOptions)
    let user= await getUser({session})
    console.log(user)
if(session){
 newCart=await prisma.cart.create({
     data: {
            userId:user?.id
        },
    })
}else{
    newCart=await prisma.cart.create({
        data
    })
}
 cookies().set("localCartId",newCart.id.toString(), {
    path: "/",
    maxAge: 3600*24*30, // Expires after 1hr
    sameSite: true,
  })
 return{
    ...newCart,
    items:[],
    size:0,
    subtotals:0
 }
}
export default createCarts