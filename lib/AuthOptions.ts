import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import connectDB from "./connectDataBase";
import User from "@/models/userModel";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) return null;

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60 * 60, // 30 hours
    updateAge: 60, // every 1 minute
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session?.user) {
        try {
          await connectDB();
          const dbUser = await User.findById(token.sub);

          if (dbUser) {
            session.user.name = dbUser.username;
            session.user.image =
              dbUser.image ||
              "https://flowbite.com/docs/images/people/profile-picture-3.jpg";
          }
        } catch (err) {
          console.error("Session callback error:", err);
        }
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export default authOptions;
