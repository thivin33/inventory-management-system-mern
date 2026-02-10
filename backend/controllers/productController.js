const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const InventoryLog = require("../models/InventoryLog");

exports.createProduct = async (req, res) => {
  try {
    // 1️⃣ Create product
    const product = await Product.create(req.body);

    // 2️⃣ Create inventory log (CORRECT PLACE)
    await InventoryLog.create({
      productName: product.name,
      type: "IN",
      quantity: product.quantity,
      reason: "New Product",
      userName: req.user.name,
      role: req.user.role,
    });

    // 3️⃣ Send response
    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
};


exports.getDashboardStats = async (req, res) => {
  const products = await Product.find();

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const lowStockProducts = products.filter(
    product => product.quantity < product.minimumStock
  );

  res.json({
    totalProducts,
    totalStock,
    lowStockCount: lowStockProducts.length,
    lowStockProducts
  });
};
