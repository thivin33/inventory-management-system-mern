import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    reason: "Purchase",
  });

  // FETCH PRODUCTS
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

  const handleSubmit = async (type) => {
    await fetch(`http://localhost:5000/api/stock/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    setShowIn(false);
    setShowOut(false);
    setForm({ productId: "", quantity: 1, reason: "Purchase" });
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Stock Management</h1>
            <p className="text-gray-500">Record stock movements</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowIn(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Stock IN
            </button>
            <button
              onClick={() => setShowOut(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Stock OUT
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-gray-500">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Current Stock</th>
                <th className="p-4 text-left">Min Stock</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.category}</td>
                  <td
                    className={`p-4 ${
                      p.quantity < p.minimumStock ? "text-red-500" : ""
                    }`}
                  >
                    {p.quantity}
                  </td>
                  <td className="p-4">{p.minimumStock}</td>
                  <td className="p-4">
                    {p.quantity < p.minimumStock ? (
                      <span className="text-red-500">Low Stock</span>
                    ) : (
                      <span className="text-green-600">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* STOCK MODAL */}
      {(showIn || showOut) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {showIn ? "Stock IN" : "Stock OUT"}
            </h2>

            <select
              className="w-full border rounded-lg px-4 py-2 mb-3"
              value={form.productId}
              onChange={(e) =>
                setForm({ ...form, productId: e.target.value })
              }
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2 mb-3"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />

            <select
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
            >
              <option>Purchase</option>
              <option>Sale</option>
              <option>Damage</option>
              <option>Expired</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowIn(false);
                  setShowOut(false);
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(showIn ? "in" : "out")}
                className={`px-4 py-2 text-white rounded-lg ${
                  showIn ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
