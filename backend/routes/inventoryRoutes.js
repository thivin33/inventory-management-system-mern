const express = require("express");
const { getHistory } = require("../controllers/inventoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/history", protect, adminOnly, getHistory);

module.exports = router;
