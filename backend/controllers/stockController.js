const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");
const mongoose = require("mongoose");

/* =========================
   STOCK IN
========================= */
exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;

    /* 🔐 VALIDATION START */
    if (!productId || !quantity || !reason) {
      return res.status(400).json({
        message: "Product, quantity and reason are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than zero",
      });
    }
    /* 🔐 VALIDATION END */

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.quantity += Number(quantity);
    await product.save();

    await InventoryLog.create({
      productId: product._id,
      productName: product.name,
      type: "IN",
      quantity: Number(quantity),
      reason,
      userName: req.user.name,
      role: req.user.role,
    });

    res.json(product);

  } catch (error) {
    console.error("Stock IN Error:", error);
    res.status(500).json({ message: "Stock in failed" });
  }
};

/* =========================
   STOCK OUT
========================= */
exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;

    /* 🔐 VALIDATION START */
    if (!productId || !quantity || !reason) {
      return res.status(400).json({
        message: "Product, quantity and reason are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than zero",
      });
    }
    /* 🔐 VALIDATION END */

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 PREVENT NEGATIVE STOCK
    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    product.quantity -= Number(quantity);
    await product.save();

    await InventoryLog.create({
      productId: product._id,
      productName: product.name,
      type: "OUT",
      quantity: Number(quantity),
      reason,
      userName: req.user.name,
      role: req.user.role,
    });

    res.json(product);

  } catch (error) {
    console.error("Stock OUT Error:", error);
    res.status(500).json({ message: "Stock out failed" });
  }
};
