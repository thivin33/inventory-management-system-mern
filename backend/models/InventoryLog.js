const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema(
  {
    productName: String,
    type: String,        // IN or OUT
    quantity: Number,
    reason: String,

    userName: String,    // ✅ REQUIRED
    role: String,        // admin or staff
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);
