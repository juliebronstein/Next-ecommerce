import { getCart } from "@/lib/db/carts"
import CartEntity from "./CartEntity"
import fromatPrice from "@/lib/db/formatPrice"
import setProductQuantity from "./action"

const CartPage=async()=>{
    const cart=await getCart()
    return(
        <div className="flex flex-col sm:flex-row justify-between  ">
           <div className="flex flex-col sm:w-3/4 ">
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
                {cart?.items.map(p=>(
                    <CartEntity setProductQuantity={setProductQuantity} cartItem={p} key={p.id}/>
                ))
                }
                </div>
                {!cart?.items.length && <p className="flex flex-col">Your cart is empty</p>}
                <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start p-5 bg-white rounded-lg border sticky top-8 h-[200px]">
                    <p className="mb-3 font-bold">
                        Total:{fromatPrice(cart?.subtotals||0)}
                    </p>
                    <button className="btn btn-primary sm:w-[200px] text-2xl ">
                        Checkout
                    </button>
                </div>
            
        </div>
    )
}
export default CartPage