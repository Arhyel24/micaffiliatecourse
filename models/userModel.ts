import mongoose, { Model, Schema } from "mongoose";

export type IUser = {
  username: string;
  email: string;
  password: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const userSchema: Schema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: String,
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
