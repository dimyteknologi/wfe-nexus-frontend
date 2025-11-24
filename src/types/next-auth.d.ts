import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    username: string;
    cityId: string;
    role: string;
    permissions: string[];
  }

  interface Session {
    accessToken: string;
    user: {
      id: string;
      username: string;
      cityId: string;
      role: string;
      permissions: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    id: string;
    username: string;
    cityId: string;
    role: string;
    permissions: string[];
  }
}
