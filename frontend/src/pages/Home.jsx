import { Link } from "react-router-dom";
import { CubeIcon, ChartBarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <CubeIcon className="w-6 h-6 text-blue-500" />
          Inventory Management System
        </div>
      </nav>

      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <span className="px-4 py-1 rounded-full border text-sm mb-6">
          Inventory Management System
        </span>

        <h1 className="text-4xl md:text-6xl font-bold">
          Take Control of Your{" "}
          <span className="text-blue-500">Inventory</span>
        </h1>

        <p className="mt-6 max-w-2xl text-gray-600">
          Streamline your stock management with real-time tracking,
          low stock alerts, and comprehensive transaction history.
          Built for teams that need clarity.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Login →
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Create Account
          </Link>
        </div>

      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

          <FeatureCard
            icon={<CubeIcon className="w-6 h-6 text-blue-500" />}
            title="Product Management"
            desc="Add, edit, and organize products with categories and minimum stock levels."
          />

          <FeatureCard
            icon={<ChartBarIcon className="w-6 h-6 text-orange-500" />}
            title="Real-time Tracking"
            desc="Monitor stock levels, track transactions, and get alerts for low inventory."
          />

          <FeatureCard
            icon={<ShieldCheckIcon className="w-6 h-6 text-green-500" />}
            title="Role-based Access"
            desc="Admin and staff roles with appropriate permissions for secure operations."
          />

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2024 Inventory Management System. Built with React & Tailwind.
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-lg">{title}</h3>
    <p className="mt-2 text-gray-600 text-sm">{desc}</p>
  </div>
);

export default Home;
