import express, { Application, Request, Response } from "express";

import connectDB from "./lib/config/mongoDB";
import {
  userRoutes,
  complaintRoutes,
  complaintCategoryRoutes,
} from "./lib/routes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/complaint", complaintRoutes);
app.use("/complaint-category", complaintCategoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
