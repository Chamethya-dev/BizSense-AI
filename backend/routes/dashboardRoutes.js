const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getMonthlyRevenue,
  getSalesTrends,
  getInventoryValue,
  getBusinessHealth,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

router.get("/summary", protect, getDashboardSummary);
router.get("/monthly-revenue", protect, getMonthlyRevenue);
router.get("/sales-trends", protect, getSalesTrends);
router.get("/inventory-value", protect, getInventoryValue);
router.get("/business-health", protect, getBusinessHealth);

module.exports = router;