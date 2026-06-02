const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getInventoryStats,
  getCategoryAnalytics,
  getRecentProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addProduct);
router.get("/low-stock", protect, getLowStockProducts);
router.get("/stats", protect, getInventoryStats);
router.get("/category-analytics", protect, getCategoryAnalytics);
router.get("/recent", protect, getRecentProducts);
router.get("/", protect, getProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;