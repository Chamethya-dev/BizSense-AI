const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getMonthlyRevenue,
  getSalesTrends,
  getInventoryValue,
  getBusinessHealth,
  getAIInsights,
  getRecommendations,
  getCategoryPerformance,
  getTopCustomers,
  getProfitAnalytics,
  getCustomerLifetimeValue,
  getRecentActivityFeed,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

router.get("/summary", protect, getDashboardSummary);
router.get("/monthly-revenue", protect, getMonthlyRevenue);
router.get("/sales-trends", protect, getSalesTrends);
router.get("/inventory-value", protect, getInventoryValue);
router.get("/business-health", protect, getBusinessHealth);
router.get("/ai-insights", protect, getAIInsights);
router.get("/recommendations", protect, getRecommendations);
router.get("/category-performance", protect, getCategoryPerformance);
router.get("/top-customers", protect, getTopCustomers);
router.get("/profit-analytics", protect, getProfitAnalytics);
router.get("/customer-lifetime-value", protect, getCustomerLifetimeValue);
router.get("/activity-feed", protect, getRecentActivityFeed);

module.exports = router;