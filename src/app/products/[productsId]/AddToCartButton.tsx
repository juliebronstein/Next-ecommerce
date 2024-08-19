"use client"
import { SlBasket } from "react-icons/sl";

interface AddToCartButtonProbs{
    productId:number
}
const AddToCartButton=({productId}:AddToCartButtonProbs)=>{
    return(
        <div className="flex items-center gap-2">
            <button onClick={()=>{  }} className="btn btn-primary">ADD TO CART <SlBasket/></button>
        </div>
    )

}
export default AddToCartButton