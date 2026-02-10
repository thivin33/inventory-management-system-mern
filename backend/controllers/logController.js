const InventoryLog = require("../models/InventoryLog");

// GET ALL LOGS (latest first)
exports.getLogs = async (req, res) => {
  try {
    const logs = await InventoryLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to load logs" });
  }
};
