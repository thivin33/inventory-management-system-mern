import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
    minimumStock: 0,
  });

  // 🔹 Fetch products
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products", {
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

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add / Edit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:5000/api/products/${editId}`
      : "http://localhost:5000/api/products";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setEditId(null);
    setForm({ name: "", category: "", quantity: 0, minimumStock: 0 });
    fetchProducts();
  };

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">Manage your product inventory</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <PlusIcon className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Min Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No products added yet
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
                    className={`p-4 ${
                      p.quantity < p.minimumStock ? "text-red-500" : ""
                    }`}
                  >
                    {p.quantity}
                  </td>

                  <td className="p-4">{p.minimumStock}</td>

                 <td className="p-4 flex justify-center gap-3">
                {/* EDIT */}
                 <button
                 onClick={() => {
                 setForm(p);
                 setEditId(p._id);
                 setShowModal(true);
                }}
                 className="p-2 rounded-lg hover:bg-blue-100 transition"
                 title="Edit product"
                  > 
                 <PencilIcon className="w-4 h-4 text-blue-600" />
                  </button>

                 {/* DELETE */}
                 <button
                    onClick={() => deleteProduct(p._id)}
                    className="p-2 rounded-lg hover:bg-red-100 transition"
                     title="Delete product"
                    >
                     <TrashIcon className="w-4 h-4 text-red-500" />
                  </button>
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* PRODUCT NAME */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Audio">Audio</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>

              {/* QUANTITY & MIN STOCK */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Stock
                  </label>
                  <input
                    type="number"
                    name="minimumStock"
                    value={form.minimumStock}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setForm({
                      name: "",
                      category: "",
                      quantity: 0,
                      minimumStock: 0,
                    });
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
