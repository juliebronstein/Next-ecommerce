
import { megrgeAnonymousCartIntoUserCart } from "@/lib/db/carts";
import { env } from "@/lib/db/env";
import prisma from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events:{
    async signIn(session){
      const name=session.user.name || ""
      const email=session.user.email || ""
      await megrgeAnonymousCartIntoUserCart(name ,email)
    }
  },
  // callbacks:{
  //   session({session,user}){
  //     session.user.id=user.id;
  //     return session
  //   }
  // },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };