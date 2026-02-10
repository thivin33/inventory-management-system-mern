const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getDashboardStats
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard
router.get("/dashboard-stats", protect, getDashboardStats);

// Products
router.get("/", protect, getProducts);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);   // ✏️ EDIT
router.delete("/:id", protect, adminOnly, deleteProduct); // 🗑 DELETE

module.exports = router;
