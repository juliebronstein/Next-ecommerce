import { Prisma } from "@prisma/client"
import prisma from "./prisma"
import { getServerSession, Session } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const getUser=async(name:string,email:string)=>{

    const user=await prisma.user.findUnique({
        where:{
            name:name!,
            email:email!
        }
    })
    console.log(user)
    return user

}
export default getUser