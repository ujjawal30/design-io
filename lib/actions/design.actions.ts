"use server";

import Design, { IDesign } from "@/lib/models/design.model";
import { connectToDatabase } from "@/lib/mongoose";

export const registerDesign = async ({
  title,
  description,
  userId,
}: RegisterDesignParams) => {
  const response: ActionsResponse<IDesign> = {
    status: false,
    message: "",
    data: null,
  };

  if (!title || !userId) {
    response.message = "Please enter all the fields.";
    return response;
  }

  try {
    await connectToDatabase();

    const newDesign = await Design.create({
      title,
      description,
      creator: userId,
    });

    if (newDesign) {
      response.status = true;
      response.message = "Design registered successfully.";
      response.data = newDesign;
    } else {
      response.message = "Unable to register new design.";
    }
  } catch (error) {
    console.error("[REGISTER_DESIGN_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};
