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

// AI Insights
exports.getAIInsights = async (req, res) => {
  try {
    const insights = [];

    // Total Products
    const totalProducts = await Product.countDocuments({
      user: req.user._id,
    });

    // Low Stock Products
    const lowStockProducts = await Product.countDocuments({
      user: req.user._id,
      $expr: {
        $lte: ["$quantity", "$lowStockLimit"],
      },
    });

    // Revenue
    const salesSummary = await Sale.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      salesSummary.length > 0
        ? salesSummary[0].totalRevenue
        : 0;

    // Revenue Insight
    if (totalRevenue > 10000) {
      insights.push({
        type: "sales",
        title: "Strong Revenue Performance",
        message: `Your business has generated Rs. ${totalRevenue} in revenue.`,
      });
    } else {
      insights.push({
        type: "sales",
        title: "Revenue Needs Improvement",
        message:
          "Consider increasing sales to improve business growth.",
      });
    }

    // Stock Insight
    if (lowStockProducts > 0) {
      insights.push({
        type: "inventory",
        title: "Low Stock Alert",
        message: `${lowStockProducts} products require restocking.`,
      });
    } else {
      insights.push({
        type: "inventory",
        title: "Inventory Healthy",
        message:
          "All products are above low stock levels.",
      });
    }

    // Product Insight
    if (totalProducts >= 10) {
      insights.push({
        type: "products",
        title: "Product Catalog Growing",
        message:
          "Your inventory contains a healthy number of products.",
      });
    } else {
      insights.push({
        type: "products",
        title: "Expand Product Catalog",
        message:
          "Adding more products may improve sales opportunities.",
      });
    }

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating AI insights",
      error: error.message,
    });
  }
};

// Business Recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = [];

    // Low Stock Products
    const lowStockProducts = await Product.find({
      user: req.user._id,
      $expr: {
        $lte: ["$quantity", "$lowStockLimit"],
      },
    });

    // Total Products
    const totalProducts = await Product.countDocuments({
      user: req.user._id,
    });

    // Revenue
    const salesSummary = await Sale.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      salesSummary.length > 0
        ? salesSummary[0].totalRevenue
        : 0;

    // Recommendation 1
    if (lowStockProducts.length > 0) {
      const productNames = lowStockProducts
        .map((product) => product.name)
        .join(", ");

      recommendations.push({
        type: "inventory",
        title: "Restock Products",
        message: `${productNames} require immediate restocking.`,
      });
    }

    // Recommendation 2
    if (totalProducts < 10) {
      recommendations.push({
        type: "growth",
        title: "Expand Product Range",
        message:
          "Adding more products could increase sales opportunities.",
      });
    }

    // Recommendation 3
    if (totalRevenue === 0) {
      recommendations.push({
        type: "sales",
        title: "Increase Sales Activity",
        message:
          "No sales have been recorded yet. Consider promotions or discounts.",
      });
    }

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating recommendations",
      error: error.message,
    });
  }
};

// Category Performance Analytics
exports.getCategoryPerformance = async (req, res) => {
  try {
    const categoryPerformance = await Sale.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: "$productDetails.category",
          totalRevenue: {
            $sum: "$products.subtotal",
          },
          totalUnitsSold: {
            $sum: "$products.quantity",
          },
          totalSales: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalRevenue: -1,
        },
      },
    ]);

    const bestCategory =
      categoryPerformance.length > 0 ? categoryPerformance[0] : null;

    res.status(200).json({
      success: true,
      bestCategory,
      categoryPerformance,
      recommendation: bestCategory
        ? `Focus marketing and stock planning on ${bestCategory._id}, as it is your strongest category.`
        : "No category performance data available yet.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category performance",
      error: error.message,
    });
  }
};