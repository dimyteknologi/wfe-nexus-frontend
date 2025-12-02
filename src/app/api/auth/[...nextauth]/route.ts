import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Error from "next/error";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  username: string;
  cityId: string;
  role: string;
  permissions: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://103.63.24.47:4000";

const handler = NextAuth({
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
          console.log("=== Login Attempt ===");
          console.log("Email:", credentials?.email);
          console.log("API URL:", `${API_URL}/auth/login`);
          
          const loginRes = await axios.post(
            `${API_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          
          console.log("Login response status:", loginRes.status);
          console.log("Login response data:", loginRes.data);
          
          const token = loginRes.data.access_token;
          if (!token) {
            console.error("Login failed: No token received in response");
            console.error("Response data:", loginRes.data);
            return null;
          }

          console.log("Token received, attempting to decode...");
          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          console.log("Decoded token:", decodedToken);
          
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
          
          console.log("Returning user object:", userObject);
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
});

export { handler as GET, handler as POST };
