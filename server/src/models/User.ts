import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
