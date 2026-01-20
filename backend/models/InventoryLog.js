const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  action: { type: String, enum: ["IN", "OUT"], required: true },
  quantity: { type: Number, required: true },
  reason: String,
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);
