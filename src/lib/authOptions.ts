import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextAuthOptions } from "next-auth";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  username: string;
  cityId: string;
  role: string;
  permissions: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://103.63.24.47:4000";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const loginRes = await axios.post(
            `${API_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          
          const token = loginRes.data.access_token;
          if (!token) {
            console.error("Login failed: No token received in response");
            console.error("Response data:", loginRes.data);
            return null;
          }

          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          
          const userId = decodedToken.sub as string;

          const userObject = {
            accessToken: token,
            id: userId,
            email: decodedToken.email,
            name: decodedToken.username,
            username: decodedToken.username,
            cityId: decodedToken.cityId,
            role: decodedToken.role,
            permissions: decodedToken.permissions,
          };
          
          return userObject;
        } catch (error) {
          console.error("=== Login Error ===");
          if (axios.isAxiosError(error)) {
            console.error("Axios error status:", error.response?.status);
            console.error("Axios error data:", error.response?.data);
            console.error("Axios error message:", error.message);
          } else {
            console.error("Non-Axios error:", error);
          }
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.username = user.username;
        token.cityId = user.cityId;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.cityId = token.cityId as string;
      session.user.role = token.role as string;
      session.user.permissions = token.permissions as string[];
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev_only",
};

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("⚠️ NEXTAUTH_SECRET is not set in environment variables. Using fallback secret.");
} else {
  console.log("✅ NEXTAUTH_SECRET is set.");
}
