import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";

export const getApplicationAnalytics = asyncHandler(async (req, res) => {
  const total = await Application.countDocuments();

  const approved = await Application.countDocuments({ status: "Approved" });
  const rejected = await Application.countDocuments({ status: "Rejected" });
  const pending = await Application.countDocuments({ status: "Pending" });

  const approvalRate = total
    ? ((approved / total) * 100).toFixed(2)
    : 0;

  const monthly = await Application.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  res.json({
    success: true,
    data: {
      total,
      approved,
      rejected,
      pending,
      approvalRate,
      monthly,
    },
  });
});