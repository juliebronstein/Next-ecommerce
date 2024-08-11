"use client"

import { ComponentProps, ReactNode } from "react"

type FormSubmitButtontProps={
    children:ReactNode,
    className?:string,
    type?:string
}& ComponentProps<"button">


const FormSubmitButtont=(
    {children,className,type}:FormSubmitButtontProps
)=>{
return(
    <button className={className} type={type} >Add Product</button>
)
}
export default FormSubmitButtont