import { NextAuthOptions } from "next-auth";
import { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectToDB from "./db";
import bcrypt from "bcryptjs";
import UserModel from "./models/User";

const adminEmails = [
  process.env.SITE_OWNER_EMAIL1,
  process.env.SITE_OWNER_EMAIL12,
  process.env.SITE_OWNER_EMAIL13,
].filter(Boolean);
const currentYear = new Date().getFullYear();
const capitalizeFirstLetter: (str: string) => string = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
          redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/callback/google'
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.given_name + " " + profile.family_name,
          email: profile.email,
          image: profile.picture,
          provider: "google",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        try {
          const user = await UserModel.findOne({
            email: credentials?.email,
            provider: "credentials",
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Credentials auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectToDB();

          const isAdmin = adminEmails.includes(user.email?.toLowerCase());
          const generatedPassword = isAdmin
            ? `Admin@${currentYear}`
            : `${capitalizeFirstLetter(
                user.email?.split("@")[0] || ""
              )}@${currentYear}`;

          let dbUser = await UserModel.findOne({ email: user.email });

          if (dbUser) {
            if (dbUser.provider !== "google") {
              throw new Error("This email is already registered with password");
            }
            user.id = dbUser._id.toString();
            user.role = dbUser.role;
            return true;
          } else {
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            dbUser = new UserModel({
              name: user.name || profile?.name || "Unknown",
              email: user.email,
              image: profile?.picture || user.image,
              provider: account.provider,
              role: isAdmin ? "admin" : "user",
              password: hashedPassword,
            });

            await dbUser.save();
            user.id = dbUser._id.toString();
            user.role = dbUser.role;
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = {
          ...session.user,
          id: token.user?.id as string,
          role: token.user?.role || "user",
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
          image: user.image ?? undefined,
          role: user.role,
          provider: user.provider,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
