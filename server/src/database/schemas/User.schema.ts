import mongoose, { Schema } from "mongoose";
import { $UserSchemaInterface } from "../types";

const UserSchema = new Schema<$UserSchemaInterface>(
  {
    name: String,
    lastName: String,
    username: String,
    password: String,
    refreshToken: String || null,
  },
  {
    timestamps: true, // add createdAt and updatedAt fields and sxet them automatically
  }
);

UserSchema.methods.getPublicData = function (this: $UserSchemaInterface) {
  return {
    username: this.username,
    name: this.name,
    lastName: this.lastName,
    refreshToken: this.refreshToken,
  };
};

export default UserSchema;
