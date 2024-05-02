import User, { IUser } from "../models/user.model";
import { connectToDatabase } from "../mongoose";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserParams) => {
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
      response.message =
        "E-mail already exists. Please try with different one.";
      return response;
    }

    const photo = `https://liveblocks.io/avatars/avatar-${Math.floor(
      Math.random() * 30
    )}.png`;

    await User.create({
      name,
      email,
      password,
      photo,
    });

    response.status = true;
    response.message = "Account created successfully.";
  } catch (error) {
    console.log("[REGISTER_USER_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};

export const authenticateUser = async ({
  email,
  password,
}: AuthenticateUserParams) => {
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
      response.message =
        "No accounts associated with this e-mail. Please create a new account.";
      return response;
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (isPasswordCorrect) {
      response.status = true;
      response.message = "Logged-in successfully.";
      response.data = user;
    } else {
      response.message = "Password you entered is incorrect.";
    }
  } catch (error) {
    console.log("[AUTHENTICATE_USER_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};
