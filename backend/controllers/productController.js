const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");
const mongoose = require("mongoose");

/* =========================
   CREATE PRODUCT (ADMIN)
========================= */
exports.createProduct = async (req, res) => {
  try {
    const { name, category, quantity, minimumStock } = req.body;

    /* 🔐 VALIDATION START */
    if (!name || !category) {
      return res.status(400).json({
        message: "Product name and category are required",
      });
    }

    if (quantity < 0 || minimumStock < 0) {
      return res.status(400).json({
        message: "Quantity and minimum stock cannot be negative",
      });
    }
    /* 🔐 VALIDATION END */

    // 1️⃣ Create product
    const product = await Product.create({
      name,
      category,
      quantity,
      minimumStock,
    });

    // 2️⃣ Create inventory log (New Product = Stock IN)
    await InventoryLog.create({
      productId: product._id,
      productName: product.name,
      type: "IN",
      quantity: product.quantity,
      reason: "New Product",
      userName: req.user.name,
      role: req.user.role,
    });

    res.status(201).json(product);

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

/* =========================
   UPDATE PRODUCT (ADMIN)
========================= */
exports.updateProduct = async (req, res) => {
  try {
    /* 🔐 ID VALIDATION */
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* =========================
   DELETE PRODUCT (ADMIN)
========================= */
exports.deleteProduct = async (req, res) => {
  try {
    /* 🔐 ID VALIDATION */
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

/* =========================
   GET PRODUCTS (ADMIN & STAFF)
========================= */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* =========================
   DASHBOARD STATS (ADMIN)
========================= */
exports.getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const lowStockProducts = products.filter(
      product => product.quantity < product.minimumStock
    );

    // 🔹 TODAY ACTIVITY
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayActivityCount = await InventoryLog.countDocuments({
      createdAt: { $gte: startOfDay },
    });

    res.json({
      totalProducts,
      totalStock,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      todayActivityCount,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
