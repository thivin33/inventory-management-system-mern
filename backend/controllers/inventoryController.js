const InventoryLog = require("../models/InventoryLog");

exports.getHistory = async (req, res) => {
  try {
    const logs = await InventoryLog.find()
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
