const express = require("express");
const { stockIn, stockOut } = require("../controllers/stockController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/in", protect, stockIn);
router.post("/out", protect, stockOut);

module.exports = router;
