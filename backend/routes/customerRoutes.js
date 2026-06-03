const express = require("express");
const {
  addCustomer,
  getCustomers,
} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addCustomer);
router.get("/", protect, getCustomers);

module.exports = router;