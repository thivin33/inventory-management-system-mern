import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const History = () => {
  const [logs, setLogs] = useState([]);

  // 🔹 Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/logs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch history logs");
      setLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-1">Transaction History</h1>
        <p className="text-gray-500 mb-6">
          Complete log of stock movements
        </p>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="p-4 text-left w-[22%]">Product</th>
                <th className="p-4 text-left w-[14%]">Type</th>
                <th className="p-4 text-left w-[12%]">Quantity</th>
                <th className="p-4 text-left w-[18%]">Reason</th>
                <th className="p-4 text-left w-[18%]">User</th>
                <th className="p-4 text-left w-[16%]">Date</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No transaction history found
                  </td>
                </tr>
              )}

              {logs.map((log) => (
                <tr key={log._id} className="border-b last:border-none">
                  {/* PRODUCT */}
                  <td className="p-4 font-medium">
                    {log.productName}
                  </td>

                  {/* TYPE */}
                  <td className="p-4">
                    {log.type === "IN" ? (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Stock In
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                        Stock Out
                      </span>
                    )}
                  </td>

                  {/* QUANTITY */}
                  <td
                    className={`p-4 font-medium ${
                      log.quantity < 0
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {log.quantity > 0
                      ? `+${log.quantity}`
                      : log.quantity}
                  </td>

                  {/* REASON */}
                  <td className="p-4">
                    {log.reason}
                  </td>

                  {/* USER */}
                  <td className="p-4">
                    <span className="font-medium text-gray-800">
                      {log.userName || "Unknown"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {" "}({log.role})
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="p-4 text-gray-600 text-sm whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
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

export default History;
