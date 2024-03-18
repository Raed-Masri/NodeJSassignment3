import mongoose, { Schema } from "mongoose";

const OtpSchema = new Schema({
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
});

const OtpModel = mongoose.model("Otp", OtpSchema);

export default OtpModel;
