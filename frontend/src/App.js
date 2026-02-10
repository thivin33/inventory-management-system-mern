import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import LowStock from "./pages/LowStock";
import History from "./pages/History";
import StaffDashboard from "./pages/StaffDashboard";
import StockManagement from "./pages/StockManagement";






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/low-stock" element={<LowStock />} />
        <Route path="/history" element={<History />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/stock-management" element={<StockManagement />} />






      </Routes>
    </BrowserRouter>
  );
}

export default App;
