import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  username: string;
  cityId: string;
  role: string;
  permissions: string[];
  exp: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://103.63.24.47:4000";

const handler = NextAuth({
  debug: false, // Disabled debug in production-like environment recommendation
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
            console.error("Login failed: No token received");
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
            // Log status and message, but avoid logging full data chunks that might contain sensitive info
            console.error("Axios error status:", error.response?.status);
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
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.username = user.username;
        token.cityId = user.cityId;
        token.role = user.role;
        token.permissions = user.permissions;
        
        // Decode to get expiration if not already present in user object
        try {
          const decoded = jwtDecode<CustomJwtPayload>(user.accessToken);
          token.exp = decoded.exp;
        } catch (e) {
             // fallback or error handling
        }
      }

      // Check if token is expired
      if (token.exp && Date.now() / 1000 > (token.exp as number)) {
        return { ...token, error: "RefreshAccessTokenError" };
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
      
      if (token.error) {
        session.error = token.error;
      }
      
      return session;
    },
  },
});

export { handler as GET, handler as POST };
