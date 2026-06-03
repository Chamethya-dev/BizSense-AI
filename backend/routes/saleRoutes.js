const express = require("express");
const {
  recordSale,
  getSalesHistory,
  getSalesStats,
  getTopSellingProducts,
  deleteSale,
} = require("../controllers/saleController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, recordSale);
router.get("/", protect, getSalesHistory);
router.get("/stats", protect, getSalesStats);
router.get("/top-products", protect, getTopSellingProducts);
router.delete("/:id", protect, deleteSale);

module.exports = router;