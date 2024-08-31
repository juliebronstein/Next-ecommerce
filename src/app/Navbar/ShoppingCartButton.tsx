"use client"

import { shoppingCart } from "@/lib/db/carts"
import fromatPrice from "@/lib/db/formatPrice";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";
interface ShoppingCart{
    cart: shoppingCart | null
}
 const ShoppingCartButton=({cart}:ShoppingCart)=>{

    const closeDropDown=()=>{
        const elm=document.getElementById("drop-down")
        if(elm)
            elm.blur()
    }
    return(
        <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <SlBasket/>
                    <span className="badge badge-sm indicator-item">
                        {cart?.size || 0}
                    </span>
                </div>
            </label>
            <div tabIndex={0}
              className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-100 shadow">
                <div className="card-body">
                <span className="text-lg font-bold">{cart?.size||0} Items</span>
                <span className="text-info">Subtotal: {fromatPrice(cart?.subtotals||0)} </span>
                <Link href="/cart" id="drop-down" onClick={closeDropDown} className="btn btn-primary btn-block">
                View cart
                </Link>
                </div>
      </div>
        </div>
    )
}
export default ShoppingCartButton
