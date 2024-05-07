import { Document, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./user.model";

export interface IDesign extends Document {
  title: string;
  description: string;
  creator: IUser | string;
  collaborators: IUser[] | string[];
  createdAt: Date;
  updatedAt: Date;
}

const DesignSchema = new Schema<IDesign>(
  {
    title: { type: String, required: true, default: "Untitled Design" },
    description: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collaborators: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  { timestamps: true }
);

const Design: Model<IDesign> = models?.Design || model("Design", DesignSchema);

export default Design;
