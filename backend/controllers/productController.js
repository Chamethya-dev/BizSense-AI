const Product = require("../models/Product");

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, supplier, lowStockLimit } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      supplier,
      lowStockLimit,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// Get low stock products
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      user: req.user.id,
      $expr: {
        $lte: ["$quantity", "$lowStockLimit"],
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching low stock products",
      error: error.message,
    });
  }
};

// Get inventory statistics
exports.getInventoryStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalValue: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0] || {
        totalProducts: 0,
        totalQuantity: 0,
        totalValue: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching inventory statistics",
      error: error.message,
    });
  }
};

// Get category analytics
exports.getCategoryAnalytics = async (req, res) => {
  try {
    const analytics = await Product.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: "$category",
          productCount: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalValue: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },
      {
        $sort: {
          productCount: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category analytics",
      error: error.message,
    });
  }
};

// Get recent products
exports.getRecentProducts = async (req, res) => {
  try {
    const products = await Product.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recent products",
      error: error.message,
    });
  }
};