import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Complaint-Category",
    },
  ],
  status: {
    type: String,
    enum: ["PENDING", "INPROGRESS", "RESOLVED", "REJECTED"],
    default: "PENDING",
  },
});

const ComplaintModel = mongoose.model("Complaint", complaintSchema);

const complaintCategoryShema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ComplaintCategoryModel = mongoose.model("Complaint-Category",complaintCategoryShema
);

export { ComplaintModel, ComplaintCategoryModel };
