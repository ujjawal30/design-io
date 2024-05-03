"use server";

import Design, { IDesign } from "@/lib/models/design.model";
import { connectToDatabase } from "@/lib/mongoose";
import User from "../models/user.model";

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
      response.data = JSON.parse(JSON.stringify(newDesign));
    } else {
      response.message = "Unable to register new design.";
    }
  } catch (error) {
    console.error("[REGISTER_DESIGN_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};

export const fetchDesign = async ({
  designId,
  populate = true,
}: FetchDesignParams) => {
  const response: ActionsResponse<IDesign> = {
    status: false,
    message: "",
    data: null,
  };

  try {
    await connectToDatabase();

    let design = await Design.findById(designId);

    if (design && populate) {
      design = await design.populate([
        {
          path: "creator",
          model: User,
          select: "name photo",
        },
        {
          path: "collaborators",
          model: User,
          select: "name photo",
        },
      ]);
    }

    if (design) {
      response.status = true;
      response.message = "Design fetched successfully.";
      response.data = JSON.parse(JSON.stringify(design));
    } else {
      response.message = "Unable to fetch design or design not found.";
    }
  } catch (error) {
    console.error("[FETCH_DESIGN_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};
