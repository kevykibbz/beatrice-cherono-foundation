import { NextAuthOptions } from "next-auth";
import { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { hashPassword, comparePassword } from "@/utils/hashPassword";
import { ActivityLogger } from "@/services/activity.service";
import { NextApiRequest } from "next";
import { prisma } from "@/lib/db";

const adminEmails = [
  process.env.SITE_OWNER_EMAIL1,
  process.env.SITE_OWNER_EMAIL12,
  process.env.SITE_OWNER_EMAIL13,
].filter(Boolean);
const currentYear = new Date().getFullYear();
const capitalizeFirstLetter = (str: string): string =>
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
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
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
      async authorize(credentials, req) {
        // Validate credentials exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        try {
          // Find user with case-insensitive email
          const user = await prisma.user.findFirst({
            where: {
              email: { equals: credentials.email, mode: "insensitive" },
              OR: [{ provider: "credentials" }, { provider: "google" }],
            },
            include: { permissions: true },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          // Verify password
          const isMatch = await comparePassword(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid credentials");
          }

          // Log successful credentials login
          await ActivityLogger.logLogin(user.id, req as NextApiRequest);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            permissions: user.permissions,
          };
        } catch (error) {
          if (process.env.NODE_ENV === "production") {
            throw new Error("Invalid credentials");
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const email = user.email?.toLowerCase() || "";
          const isAdmin = adminEmails.includes(email);

          const generatedPassword = isAdmin
            ? `Admin@${currentYear}`
            : `${capitalizeFirstLetter(
                user.email?.split("@")[0] || ""
              )}@${currentYear}`;

          let dbUser = await prisma.user.findUnique({
            where: { email },
            include: { permissions: true },
          });

          if (dbUser) {
            if (dbUser.provider !== "google") {
              throw new Error("This email is already registered with password");
            }
            user.id = dbUser.id;
            user.role = dbUser.role;
            user.permissions = dbUser.permissions;
          } else {
            const hashed = await hashPassword(generatedPassword);

            // Get all available permissions for admin users
            const allPermissions = await prisma.permission.findMany();
            const adminPermissions = isAdmin ? allPermissions : [];

            dbUser = await prisma.user.create({
              data: {
                name: user.name || profile?.name || "Unknown",
                email,
                image: profile?.picture || user.image,
                provider: account.provider,
                role: isAdmin ? "admin" : "user",
                password: hashed,
                permissions: {
                  connect: adminPermissions.map((p) => ({ id: p.id })),
                },
              },
              include: { permissions: true },
            });

            user.id = dbUser.id;
            user.role = dbUser.role;
            user.permissions = dbUser.permissions;
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
          ...(token.user?.role === "admin" && {
            permissions: token.user?.permissions || [],
          }),
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
          ...(token.user?.role === "admin" && {
            permissions: token.user?.permissions || [],
          }),
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
