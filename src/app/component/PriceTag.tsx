import fromatPrice from "@/lib/db/formatPrice"

interface PriceTagProbs{
    price:number,
    className?:string
}

const PriceTag=({className,price}:PriceTagProbs)=>{
    return <span className={`badge ${className}`}> {fromatPrice(price)} </span>
}
export default PriceTag