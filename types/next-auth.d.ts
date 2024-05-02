import { IUser } from "@/lib/models/user.model";
import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      token: string;
      name: string;
      email: string;
      photo: string;
    };
  }
  interface User extends IUser {
    _id: string;
    name: string;
    email: string;
    photo: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
      token: string;
      name: string;
      email: string;
      photo: string;
    };
  }
}
