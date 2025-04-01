import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Permission } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      provider?: string;
      image?: string;
      permissions?: Permission[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string;
    provider?: string;
    permissions?: Permission[];
  }

  interface Profile {
    picture?: string; 
    given_name?: string;
    family_name?: string;
  }
  
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name?: string;  
      email?: string;
      image?: string;
      role?: string;
      provider?: string;
      permissions?: Permission[]; 
    };
  }
}
