const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const logRoutes = require("./routes/logRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes"); // ✅ ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/inventory", inventoryRoutes); // ✅ ADD THIS

// 🔹 Test route
app.get("/api/test", (req, res) => {
  res.send("IMS Backend with DB Connected");
});

// 🔹 Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
