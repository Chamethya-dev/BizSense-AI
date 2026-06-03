const Product = require("../models/Product");
const Sale = require("../models/Sale");
const mongoose = require("mongoose");

// Record a new sale
exports.recordSale = async (req, res) => {
  try {
    const { products, customer } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide products for the sale",
      });
    }

    let saleItems = [];
    let totalAmount = 0;
    let totalProfit = 0;

    for (const item of products) {
      const { productId, quantity } = item;

      const product = await Product.findOne({
        _id: productId,
        user: req.user.id,
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}`,
        });
      }

      const subtotal = product.price * quantity;
      const profit = (product.price - product.costPrice) * quantity;

      saleItems.push({
        product: product._id,
        name: product.name,
        quantity,
        price: product.price,
        costPrice: product.costPrice,
        subtotal,
        profit,
      });

      totalAmount += subtotal;
      totalProfit += profit;

      product.quantity -= quantity;
      await product.save();
    }

    const sale = await Sale.create({
      user: req.user.id,
      products: saleItems,
      totalAmount,
      totalProfit,
      customer,
    });

    res.status(201).json({
      success: true,
      message: "Sale recorded successfully",
      sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error recording sale",
      error: error.message,
    });
  }
};

// Get sales history
exports.getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user.id })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sales history",
      error: error.message,
    });
  }
};

// Get sales statistics
exports.getSalesStats = async (req, res) => {
  try {
    const stats = await Sale.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: null,
          totalSalesAmount: { $sum: "$totalAmount" },
          totalProfit: { $sum: "$totalProfit" },
          totalSalesCount: { $sum: 1 },
          averageSaleAmount: { $avg: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0] || {
        totalSalesAmount: 0,
        totalProfit: 0,
        totalSalesCount: 0,
        averageSaleAmount: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sales statistics",
      error: error.message,
    });
  }
};

// Get top selling products
exports.getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.product",
          name: { $first: "$products.name" },
          totalQuantitySold: { $sum: "$products.quantity" },
          totalRevenue: { $sum: "$products.subtotal" },
          totalProfit: { $sum: "$products.profit" },
        },
      },
      {
        $sort: {
          totalQuantitySold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      success: true,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching top selling products",
      error: error.message,
    });
  }
};

// Delete sale
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    await Sale.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting sale",
      error: error.message,
    });
  }
};