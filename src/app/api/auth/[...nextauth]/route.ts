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
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://103.63.24.47:4000/";

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

          return {
            accessToken: token,
            id: userId,
            email: decodedToken.email,
            name: decodedToken.username,
            username: decodedToken.username,
            cityId: decodedToken.cityId,
            role: decodedToken.role,
            permissions: decodedToken.permissions,
          };
        } catch (error: any) {
          console.error("Login error:", error?.response?.data || error.message);
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
