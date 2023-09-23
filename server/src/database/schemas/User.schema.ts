import mongoose, { ObjectId, Schema } from "mongoose";
import { $UserSchemaInterface } from "../types";
import { Post } from "../models";

const UserSchema = new Schema<$UserSchemaInterface>(
  {
    name: String,
    lastName: String,
    username: String,
    password: String,
    refreshToken: String || null,
    followers: Array<ObjectId>,
    followed: Array<ObjectId>,
  },
  {
    timestamps: true, // add createdAt and updatedAt fields and sxet them automatically
  }
);

UserSchema.methods.getPublicData = async function (
  this: $UserSchemaInterface,
  showRefreshToken: boolean = true
) {
  const userPostsCount = await Post.find({ user: this._id }).count();

  return {
    username: this.username,
    name: this.name,
    lastName: this.lastName,
    refreshToken: showRefreshToken ? this.refreshToken : null,
    followed: this.followed,
    followers: this.followers,
    postsUploaded: userPostsCount,
  };
};

export default UserSchema;
