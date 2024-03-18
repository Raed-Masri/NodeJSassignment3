import express, { Router, Response } from "express";
import { IComplaint } from "../types/complaint.types";
import { ComplaintModel } from "../models/complaint.model";

const router: Router = express.Router();

router.post("/", async (req: { body: IComplaint }, res: Response) => {
  try {
    await ComplaintModel.create({ ...req.body });

    res.status(200).send("created successfully");
  } catch (error) {
    return error;
  }
});
//update complaint
router.patch("/:id",async (req: { params: { id: string }; body: IComplaint }, res: Response) => {
    const { id } = req.params;
    try {
      const isExist = await ComplaintModel.findById({ _id: id });

      if (isExist) {
        await ComplaintModel.updateOne({ _id: id }, { ...req.body });

        res.status(200).send("complaint updated");
      } else {
        res.status(404).send("complaint not found");
      }
    } catch (error) {
      return error;
    }
  }
);

router.delete("/:id",async (req: { params: { id: string } }, res: Response) => {
    const { id } = req.params;
    try {
      const isExixt = await ComplaintModel.findById({ _id: id });

      if (isExixt) {
        await ComplaintModel.deleteOne({ _id: id });
        res.status(200).send("delete successfully");
      } else {
        res.status(404).send("complaint not found");
      }
    } catch (error) {
      return error;
    }
  }
);
// get complaint model
router.get("/:id", async (req: { params: { id: string } }, res: Response) => {
  const { id } = req.params;
  try {
    const complaint = await ComplaintModel.findById({_id: id,});

    if (complaint) {
      res.status(200).send(complaint);
    } else {
      res.status(404).send("complaint not found");
    }
  } catch (error) {
    return error;
  }
});

router.get( "/",async (req: { query: { page: string; limit: string } }, res: Response) => {
    const { page, limit } = req.query;
    try {
      const pageNbr = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;
      const skip = (pageNbr - 1) * pageSize;
      const complaints = await ComplaintModel.find().skip(skip).limit(pageSize);
      const totalCount = await ComplaintModel.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      res.send({
        complaints,
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
