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

// Sales Trends Analytics
exports.getSalesTrends = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const salesTrends = await Sale.aggregate([
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
            day: { $dayOfMonth: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          salesCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      salesTrends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sales trends",
      error: error.message,
    });
  }
};

// Inventory Value Analytics
exports.getInventoryValue = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const inventoryValue = await Product.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$category",
          totalValue: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
          productCount: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: {
          totalValue: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      inventoryValue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching inventory value",
      error: error.message,
    });
  }
};

// Business Health Score
exports.getBusinessHealth = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Total Sales
    const totalSales = await Sale.countDocuments({
      user: userId,
    });

    // Inventory Value
    const inventoryData = await Product.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },
    ]);

    const inventoryValue = inventoryData[0]?.totalValue || 0;

    // Low Stock Products
    const lowStockProducts = await Product.countDocuments({
      user: userId,
      $expr: {
        $lte: ["$quantity", "$lowStockLimit"],
      },
    });

    let salesScore = 0;
    let inventoryScore = 0;
    let stockScore = 0;

    // Sales Score
    if (totalSales >= 5) {
      salesScore = 40;
    } else if (totalSales >= 1) {
      salesScore = 20;
    }

    // Inventory Score
    if (inventoryValue >= 50000) {
      inventoryScore = 30;
    } else if (inventoryValue > 0) {
      inventoryScore = 15;
    }

    // Stock Score
    if (lowStockProducts === 0) {
      stockScore = 30;
    } else if (lowStockProducts <= 3) {
      stockScore = 20;
    } else {
      stockScore = 10;
    }

    const healthScore =
      salesScore +
      inventoryScore +
      stockScore;

    let status = "Poor";

    if (healthScore >= 90) {
      status = "Excellent";
    } else if (healthScore >= 70) {
      status = "Good";
    } else if (healthScore >= 50) {
      status = "Average";
    }

    res.status(200).json({
      success: true,
      healthScore,
      status,
      breakdown: {
        salesScore,
        inventoryScore,
        stockScore,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating business health",
      error: error.message,
    });
  }
};