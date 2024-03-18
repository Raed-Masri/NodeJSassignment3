import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isVip: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
