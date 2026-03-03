import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const LowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // 🔹 Fetch products and filter low stock
  const fetchLowStock = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      const filtered = data.filter(
        (p) => p.quantity < p.minimumStock
      );
      setLowStockProducts(filtered);
    } else {
      setLowStockProducts([]);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-1">Low Stock</h1>
        <p className="text-gray-500 mb-6">
          Products that need restocking
        </p>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Current Stock</th>
                <th className="p-4 text-left">Minimum Required</th>
                <th className="p-4 text-left">Shortage</th>
              </tr>
            </thead>

            <tbody>
              {/* EMPTY STATE */}
              {lowStockProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500"
                  >
                    No low stock products 🎉
                  </td>
                </tr>
              )}

              {/* LOW STOCK LIST */}
              {lowStockProducts.map((p) => (
                <tr
                  key={p._id}
                  className="border-b bg-red-50 last:border-none"
                >
                  <td className="p-4 font-medium">{p.name}</td>

                  <td className="p-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-4 text-red-600 font-medium">
                    {p.quantity}
                  </td>

                  <td className="p-4">{p.minimumStock}</td>

                  <td className="p-4 text-red-600 font-medium">
                    {p.quantity - p.minimumStock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default LowStock;
