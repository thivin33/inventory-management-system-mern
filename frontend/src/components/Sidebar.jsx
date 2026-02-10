import { useNavigate, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  CubeIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role"); // "admin" or "staff"

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      
      {/* LOGO */}
      <div className="px-6 py-5 text-xl font-semibold">
        Inventory
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-2">

        {/* DASHBOARD (ADMIN + STAFF) */}
        <MenuItem
          icon={<Squares2X2Icon className="w-5 h-5" />}
          label="Dashboard"
          active={
            role === "admin"
              ? location.pathname === "/dashboard"
              : location.pathname === "/staff-dashboard"
          }
          onClick={() =>
            role === "admin"
              ? navigate("/dashboard")
              : navigate("/staff-dashboard")
          }
        />

        {/* STAFF ONLY → STOCK MANAGEMENT */}
        {role === "staff" && (
          <MenuItem
            icon={<ArrowPathIcon className="w-5 h-5" />}
            label="Stock Management"
            active={location.pathname === "/stock-management"}
            onClick={() => navigate("/stock-management")}
          />
        )}

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <>
            <MenuItem
              icon={<CubeIcon className="w-5 h-5" />}
              label="Products"
              active={location.pathname === "/products"}
              onClick={() => navigate("/products")}
            />

            <MenuItem
              icon={<ExclamationTriangleIcon className="w-5 h-5" />}
              label="Low Stock"
              active={location.pathname === "/low-stock"}
              onClick={() => navigate("/low-stock")}
            />

            <MenuItem
              icon={<ClockIcon className="w-5 h-5" />}
              label="History"
              active={location.pathname === "/history"}
              onClick={() => navigate("/history")}
            />
          </>
        )}
      </nav>

      {/* USER INFO */}
      <div className="px-4 py-4 border-t border-slate-700">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-slate-400 capitalize">{role}</p>

        <button
          onClick={handleLogout}
          className="mt-3 flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

const MenuItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
      ${active ? "bg-blue-500 text-white" : "text-slate-300 hover:bg-slate-700"}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
