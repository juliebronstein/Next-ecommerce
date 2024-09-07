// import { cookies } from "next/headers"
// import prisma from "./prisma"
// import { number } from "zod"

// export const getCart=async()=>{
// const localCartId=cookies().get("localCartId")?.value
// const id0=Number(localCartId)


// const cart=localCartId ?  
//     await prisma.cart.findUnique({where:{id:id0},
//         include:{items:{include:{product:true}}} })
//     :null
// if(!cart) return null
// return {
//      ...cart,
//       size:cart.items.reduce((acc,item)=>acc+item.quantity,0)
// }
// }
// export const createCart=async()=>{
// const newCart=await prisma.cart.create({
//     data:{}
// })
// // cookies().set("localCartId",newCart.id)

// }