import { cookies } from "next/headers"
import prisma from "./pri sma"


export const getCartid=async()=>{
    const localCartId=cookies().get("localCartId")?.value
const id0=Number(localCartId)

const cart=localCartId ?  
    await prisma.cart.findUnique({where:{id:id0},
        include:{items:{include:{product:true}}} })
    :null
if(!cart) return null
// return {
//      ...cart,
//       size:cart.items.reduce((acc,item)=>
//         acc+item.quantity*(item.product.price?item.product.price:0),0)
// }
return {
    ...cart,
    size: cart.items.reduce((total, item) => {
      const price = item.product.price ?? 0; // Use nullish coalescing for price
      return total + item.quantity * price;
    }, 0),
  };
}
const createCarts=async()=>{
  
    const newCart=await prisma.cart.create({
        data:{
            items:{
                create:[
                    {productid:1,quantity:5},
                    {productid:1,quantity:5},
                ]
            }
        }
    })
 cookies().set("localCartid",newCart.id.toString())
}
export default createCarts