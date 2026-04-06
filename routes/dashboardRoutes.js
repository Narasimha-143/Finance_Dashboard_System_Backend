const express = require("express");
const router = express.Router();

const { getDashboardSummary } = require("../controllers/dashboardController");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Only Admin & Analyst
router.get("/summary", authorizeRoles("admin", "analyst"), getDashboardSummary);

module.exports = router;