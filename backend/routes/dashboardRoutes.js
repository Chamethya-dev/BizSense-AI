const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getMonthlyRevenue,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

router.get("/summary", protect, getDashboardSummary);
router.get("/monthly-revenue", protect, getMonthlyRevenue);

module.exports = router;