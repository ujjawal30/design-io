"use server";

import { revalidatePath } from "next/cache";
import { UpdateQuery } from "mongoose";

import { connectToDatabase } from "@/lib/mongoose";
import Design, { IDesign } from "@/lib/models/design.model";
import User from "@/lib/models/user.model";

export const registerDesign = async ({ title, description, userId }: RegisterDesignParams) => {
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

export const fetchDesign = async ({ designId, populate = true }: FetchDesignParams) => {
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

export const updateDesignMetadata = async ({ designId, title, description, path }: UpdateDesignMetadataParams) => {
  const response: ActionsResponse<IDesign> = {
    status: false,
    message: "",
    data: null,
  };

  if (!designId || !title || !path) {
    response.message = "Invalid request.";
    return response;
  }

  try {
    await connectToDatabase();

    let design = await Design.findById(designId);

    if (design) {
      const updatedDesign = await Design.findByIdAndUpdate(designId, {
        title,
        description,
      });

      if (updatedDesign) {
        revalidatePath(path);

        response.status = true;
        response.message = "Design metadata updated successfully.";
      } else {
        response.message = "Unable to update design metadata.";
      }
    } else {
      response.message = "Design not found.";
    }
  } catch (error) {
    console.error("[UPDATE_DESIGN_METADATA_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};

export const updateCollaborators = async ({ designId, userId, action, path }: UpdateCollaboratorsParams) => {
  const response: ActionsResponse<IDesign> = {
    status: false,
    message: "",
    data: null,
  };

  if (!designId || !userId || !action || !path) {
    response.message = "Invalid request.";
    return response;
  }

  try {
    await connectToDatabase();

    const data: UpdateQuery<IDesign> =
      action === "add"
        ? {
            $push: { collaborators: userId },
          }
        : {
            $pull: { collaborators: userId },
          };

    const design = await Design.findByIdAndUpdate(designId, data);
    if (design) {
      revalidatePath(path);

      response.status = true;
      response.message = "Design collaborators updated successfully.";
    } else {
      response.message = "Unable to update design collaborators.";
    }
  } catch (error) {
    console.error("[UPDATE_DESIGN_COLLABORATORS_ERROR] :>> ", error);
    response.message = "Somethng went wrong. Please try again!";
  }

  return response;
};
