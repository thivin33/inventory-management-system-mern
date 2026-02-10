const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");

// STOCK IN
exports.stockIn = async (req, res) => {
  const { productId, quantity, reason } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.quantity += Number(quantity);
  await product.save();

  await InventoryLog.create({
    productId: product._id,
    productName: product.name,
    type: "IN",
    quantity,
    reason,
    userName: req.user.name,
    role: req.user.role,
  });

  res.json(product);
};

// STOCK OUT
exports.stockOut = async (req, res) => {
  const { productId, quantity, reason } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.quantity < quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  product.quantity -= Number(quantity);
  await product.save();

  await InventoryLog.create({
    productId: product._id,
    productName: product.name,
    type: "OUT",
    quantity,
    reason,
    userName: req.user.name,
    role: req.user.role,
  });

  res.json(product);
};
