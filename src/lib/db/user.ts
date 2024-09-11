import { Prisma } from "@prisma/client"
import prisma from "./prisma"
import { getServerSession, Session } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"




interface GetUserProbs{
    session:Session | null
}


const getUser=async({session}:GetUserProbs)=>{
    //  session=await getServerSession(authOptions)
    if(session){
    const user=await prisma.user.findUnique({
        where:{
            name:session.user?.name!,
            email:session.user?.email!
        }
    })
    return user
}
return null
}
export default getUser



export const getUserbyNameEmail=async(name:string,email:string)=>{

    const user=await prisma.user.findUnique({
        where:{
            name:name,
            email:email
        }
    })
    console.log(user)
    return user

}
