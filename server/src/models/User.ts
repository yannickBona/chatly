import mongoose from "mongoose";
import { $UserSchemaInterface } from "../types/models";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  lastName: String,
  username: String,
  password: String,
});

UserSchema.methods.getPublicData = function (this: $UserSchemaInterface) {
  return { username: this.username, name: this.name, lastName: this.lastname };
};

const userModel = mongoose.model<$UserSchemaInterface>("User", UserSchema);

export default userModel;
