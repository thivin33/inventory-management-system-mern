import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const StaffDashboard = () => {
  const [products, setProducts] = useState([]);

  // 🔹 Fetch products (REAL DATA)
  const fetchProducts = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-6">
          View current inventory status
        </p>

        {/* PRODUCT LIST */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg">Product List</h2>
            <span className="text-sm text-gray-500">
              {products.length} products
            </span>
          </div>

          <table className="w-full">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No products available
                  </td>
                </tr>
              )}

              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-4 font-medium">{p.name}</td>

                  <td className="p-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {p.category}
                    </span>
                  </td>

                  <td
                    className={`p-4 font-medium ${
                      p.quantity < p.minimumStock
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {p.quantity}
                  </td>

                  <td className="p-4">
                    {p.quantity < p.minimumStock ? (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    )}
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

export default StaffDashboard;
