import { getCart } from "@/lib/db/carts"
import CartEntity from "./CartEntity"
import fromatPrice from "@/lib/db/formatPrice"
import setProductQuantity from "./action"

const CartPage=async()=>{
    const cart=await getCart()
    return(
        <div className="">
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
           
                {cart?.items.map(p=>(
                    <CartEntity setProductQuantity={setProductQuantity} cartItem={p} key={p.id}/>
                ))
                }
                {!cart?.items.length && <p className="">Your cart is empty</p>}
                <div className="flex flex-col items-end sm:items-center">
                    <p className="mb-3 font-bold">
                        Total:{fromatPrice(cart?.subtotals||0)}
                    </p>
                    <button className="btn btn-primary sm:w-[200px]">
                        Checkout
                    </button>
                </div>
            
        </div>
    )
}
export default CartPage