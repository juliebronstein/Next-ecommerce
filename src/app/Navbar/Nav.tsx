import Link from "next/link";
import logo from "@/assets/logo.png"
import Image from "next/image";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/carts";
import UserMenuButton from "./UserMenuButtons";
import  {getServerSession}  from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


    const searchProduct=async(formData:FormData)=>{
        "use server"
        const search=formData.get("serachQuery")?.toString()
        if(search){
            redirect("/search?query="+search)
        }
    }   
const NavBar=async()=>{
    const cart=await getCart()
    const session=await getServerSession(authOptions)
    // console.log(session)
    return(
        <div className="bg-slate-100 mb-5">
            <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                <Link className="btn btn-ghost text-lg" href="/">
                <Image 
                src={logo} 
                alt="E-commerce"
                width={80}
                height={80}
                placeholder="blur"
                blurDataURL="/assets/images/loader.svg"
                quality={50}
                />
                WEBSTORE
                </Link>
                </div>
                <div className="flex-none ">
                    <form action={searchProduct} >
                        <div className="form-control flex-col sm:flex-row">
                            <input 
                            className="input gap-2 w-full min-w-[100px]"
                            placeholder="Search"
                            name="serachQuery"
                             >
                                
                             </input>
                             
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
    )
}
export default NavBar