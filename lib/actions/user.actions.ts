"use server";

import authOptions from "@/auth.config";
import User, { IUser } from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { FilterQuery } from "mongoose";
import { getServerSession } from "next-auth";

export const registerUser = async ({ name, email, password }: RegisterUserParams) => {
  const response: ActionsResponse<IUser> = {
    status: false,
    message: "",
    data: null,
  };

  if (!name || !email || !password) {
    response.message = "Please enter all the fields.";
    return response;
  }

  try {
    await connectToDatabase();

    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      response.message = "E-mail already exists. Please try with different one.";
      return response;
    }

    const photo = `https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`;

    await User.create({
      name,
      email,
      password,
      photo,
    });

    response.status = true;
    response.message = "Account created successfully.";
  } catch (error) {
    console.error("[REGISTER_USER_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};

export const authenticateUser = async ({ email, password }: AuthenticateUserParams) => {
  const response: ActionsResponse<IUser> = {
    status: false,
    message: "",
    data: null,
  };

  if (!email || !password) {
    response.message = "Please enter all the fields.";
    return response;
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      response.message = "No accounts associated with this e-mail. Please create a new account.";
      return response;
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (isPasswordCorrect) {
      response.status = true;
      response.message = "Logged-in successfully.";
      response.data = JSON.parse(JSON.stringify(user));
    } else {
      response.message = "Password you entered is incorrect.";
    }
  } catch (error) {
    console.error("[AUTHENTICATE_USER_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};

export const fetchUsers = async ({ q, userId, limit = 10 }: FetchUsersParams) => {
  const response: ActionsResponse<IUser[]> = {
    status: false,
    message: "",
    data: null,
  };

  if (!userId) {
    userId = (await getServerSession(authOptions))?.user.id!;
  }

  try {
    await connectToDatabase();

    const regex = new RegExp(q, "i");

    const query: FilterQuery<IUser> = {
      _id: { $ne: userId },
    };

    if (q.trim() !== "") {
      query.$or = [{ name: { $regex: regex } }, { email: { $regex: regex } }];
    }

    const users = await User.find(query).limit(limit);

    if (users.length > 0) {
      response.status = true;
      response.message = "Users fetched successfully.";
      response.data = JSON.parse(JSON.stringify(users));
    } else {
      response.message = "No users found.";
    }
  } catch (error) {
    console.error("[FETCH_USERS_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};

export const fetchUsersFromIds = async (userIds: string[], limit: number = 5) => {
  const response: ActionsResponse<IUser[]> = {
    status: false,
    message: "",
    data: null,
  };

  try {
    await connectToDatabase();

    const users = await User.find({ _id: { $in: userIds } }).limit(limit);

    if (users.length > 0) {
      response.status = true;
      response.message = "Users fetched successfully.";
      response.data = JSON.parse(JSON.stringify(users));
    } else {
      response.message = "No users found.";
      response.data = [];
    }
  } catch (error) {
    console.error("[FETCH_USERS_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};
