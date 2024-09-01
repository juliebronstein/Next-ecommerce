
import { env } from "@/lib/db/env";
import prisma from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOption:NextAuthOptions={
    adapter:PrismaAdapter(prisma)as Adapter,
    providers: [
  GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET
  })
]
} 
const handler=NextAuth(authOption)
export {handler as POST,handler as GET}
