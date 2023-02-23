import mongoose from "mongoose";
import Post from "./Post";
import Comment from "./Comment";
import User from "./User";
import Like from "./Like";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", true);

console.log("Running seed script...");
console.log("Defining the models..");

const users = [
  { username: "Johnny" },
  { username: "Redd" },
  { username: "Yan" },
];

const posts = [
  { title: "Post 1", body: "This is post 1" },
  { title: "Post 2", body: "This is post 2" },
];

const comments = [
  {
    content: "This is a comment",
    userId: "user1",
    postId: "post1",
    parentId: "",
    children: [""],
    like: ["like4"],
  },
  {
    content: "This is a comment",
    userId: "user2",
    postId: "post1",
    parentId: "",
    children: [""],
    like: ["like2"],
  },
  {
    content: "This is a comment",
    userId: "user1",
    postId: "post1",
    parentId: "",
    children: [""],
    like: ["like3"],
  },
];

const seedDatabase = async () => {
  console.log("Connecting to the DB...");
  await mongoose
    .connect(process.env.MONGO_URL!)
    .then(async () => {
      console.log("Inserting users...");
      const insertedUsers = await User.insertMany(users);

      console.log("Inserting posts...");
      const insertedPosts = await Post.insertMany(posts);

      console.log("Mapping userID & postId...");
      const userIds = insertedUsers.map((user) => user._id);
      const postIds = insertedPosts.map((post) => post._id);

      const commentsToInsert = comments.map((comment) => {
        return {
          ...comment,
          userId: userIds.find((id) => id.toString() === comment.userId),
          postId: postIds.find((id) => id.toString() === comment.postId),
        };
      });

      console.log("Inserting comments...");
      const insertedComments = await Comment.insertMany(commentsToInsert);

      console.log("Database seeded successfully");
      process.exit(0);
    })
    .catch((err) => console.log(`Failed to connect to the DB: ${err}`));
};

seedDatabase();
