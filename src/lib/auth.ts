import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {admin} from "better-auth/plugins";
import prisma from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  plugins: [
    admin({
      adminRole: ["admin", "superAdmin"],
      defaultBanReason: "Ban by Administartor",
  }) 
],
});

export type Session = typeof auth.$Infer.Session;