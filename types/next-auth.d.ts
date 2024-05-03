import { IUser } from "@/lib/models/user.model";
import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      photo: string;
    };
  }
  interface User {
    id: string;
    name: string;
    email: string;
    photo: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      photo: string;
    };
  }
}
