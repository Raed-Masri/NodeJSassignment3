import express, { Router, Response } from "express";
import { IComplaintCategory } from "../types/complaintCategory.types";
import { ComplaintCategoryModel } from "../models/complaint.model";

const router: Router = express.Router();

router.post("/", async (req: { body: IComplaintCategory }, res: Response) => {
  try {
    await ComplaintCategoryModel.create(req.body);

    res.status(200).send("created successfully");
  } catch (error) {
    return error;
  }
});

router.patch(
  "/:id",
  async (
    req: { body: IComplaintCategory; params: { id: string } },
    res: Response
  ) => {
    const { id } = req.params;
    try {
      const isExixt = await ComplaintCategoryModel.findById({ _id: id });

      if (isExixt) {
        await ComplaintCategoryModel.updateOne({ _id: id }, { ...req.body });
        res.status(200).send("update successfully");
      } else {
        res.status(404).send("complaint category not found");
      }
    } catch (error) {
      return error;
    }
  }
);

router.delete(
  "/:id",
  async (req: { params: { id: string } }, res: Response) => {
    const { id } = req.params;
    try {
      const isExixt = await ComplaintCategoryModel.findById({ _id: id });

      if (isExixt) {
        await ComplaintCategoryModel.deleteOne({ _id: id });
        res.status(200).send("delete successfully");
      } else {
        res.status(404).send("complaint category not found");
      }
    } catch (error) {
      return error;
    }
  }
);

router.get("/:id", async (req: { params: { id: string } }, res: Response) => {
  const { id } = req.params;
  try {
    const complaintCategory = await ComplaintCategoryModel.findById({
      _id: id,
    });

    if (complaintCategory) {
      res.status(200).send(complaintCategory);
    } else {
      res.status(404).send("complaint category not found");
    }
  } catch (error) {
    return error;
  }
});

router.get(
  "/",
  async (req: { query: { page: string; limit: string } }, res: Response) => {
    const { page, limit } = req.query;
    try {
      const pageNbr = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;
      const skip = (pageNbr - 1) * pageSize;
      const complaintsCategory = await ComplaintCategoryModel.find()
        .skip(skip)
        .limit(pageSize);
      const totalCount = await ComplaintCategoryModel.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      res.send({
        complaintsCategory,
        totalPages,
        currentPage: parseInt(page),
        pageSize,
      });
    } catch (error) {
      return error;
    }
  }
);

export default router;
