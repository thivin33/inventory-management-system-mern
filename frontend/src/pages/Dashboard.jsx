import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  CubeIcon,
  Squares2X2Icon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/dashboard-stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mb-8">
          Overview of your inventory status
        </p>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Products" value={stats.totalProducts} icon={<CubeIcon />} />
          <StatCard title="Total Stock" value={stats.totalStock} icon={<Squares2X2Icon />} />
          <StatCard title="Low Stock Items" value={stats.lowStockCount} icon={<ExclamationTriangleIcon />} />
          <StatCard title="Today's Activity" value={stats.todayActivityCount} icon={<ChartBarIcon />} />

        </div>

        {/* LOW STOCK ALERT – ONLY WHEN EXISTS */}
        {stats.lowStockCount > 0 && (
          <div className="border border-yellow-300 bg-yellow-50 rounded-xl p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
              Low Stock Alert
            </h2>

            {stats.lowStockProducts.map(product => (
              <div
                key={product._id}
                className="flex justify-between bg-white px-4 py-3 rounded-lg mb-3"
              >
                <span>{product.name}</span>
                <span className="text-red-500">
                  {product.quantity} / {product.minimumStock} min
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
  </div>
);

export default Dashboard;
