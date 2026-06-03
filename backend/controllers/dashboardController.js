const Product = require("../models/Product");
const Sale = require("../models/Sale");
const mongoose = require("mongoose");

// Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalProducts = await Product.countDocuments({ user: userId });

    const lowStockProducts = await Product.countDocuments({
      user: userId,
      $expr: { $lte: ["$quantity", "$lowStockLimit"] },
    });

    const salesSummary = await Sale.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: { $sum: 1 },
        },
      },
    ]);

    const inventorySummary = await Product.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          inventoryValue: {
            $sum: { $multiply: ["$price", "$quantity"] },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      summary: {
        totalProducts,
        lowStockProducts,
        totalSales: salesSummary[0]?.totalSales || 0,
        totalRevenue: salesSummary[0]?.totalRevenue || 0,
        inventoryValue: inventorySummary[0]?.inventoryValue || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard summary",
      error: error.message,
    });
  }
};

// Monthly Revenue Analytics
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const monthlyRevenue = await Sale.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          salesCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching monthly revenue",
      error: error.message,
    });
  }
};