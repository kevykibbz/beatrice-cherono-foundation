import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      provider?: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string;
    provider?: string;
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
    };
  }
}
