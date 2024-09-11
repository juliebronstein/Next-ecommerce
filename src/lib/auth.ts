

import { megrgeAnonymousCartIntoUserCart } from "@/lib/db/carts";
import { env } from "@/lib/db/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db/prisma";

 const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    events:{
      async signIn(session){
        await megrgeAnonymousCartIntoUserCart(session.user.name || "" ,session.user.email || "")
      }
    },
  



    


  };
  export default authOptions