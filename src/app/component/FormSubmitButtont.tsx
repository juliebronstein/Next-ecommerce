"use client"

import { ComponentProps, ReactNode } from "react";
import { useFormStatus } from 'react-dom'
type FormSubmitButtontProps={
    children:ReactNode,
    className?:string,
    type?:string
}& ComponentProps<"button">


const FormSubmitButtont=(
    {children,className,type,...props}:FormSubmitButtontProps
)=>{
    const {pending}=useFormStatus()
return(
    <button
    {...props}
     disabled={pending} className={`btn btn-primary ${className}`} type={type} >
        {pending&&<span className="loading loading-dots loading-md"></span>}
        {children}
        
    </button>
)
}
export default FormSubmitButtont