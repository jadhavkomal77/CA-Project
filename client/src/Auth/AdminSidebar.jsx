import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import {
  useAdminLogoutMutation,
  useAdminProfileQuery,
} from "../redux/apis/adminApi";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout] = useAdminLogoutMutation();
  const { data } = useAdminProfileQuery();

  const admin = data?.admin;

  const menu = [
    { name: "Dashboard", path: "/adminDash", icon: <LayoutDashboard size={18} /> },
    { name: "Profile", path: "/adminDash/profile", icon: <User size={18} /> },
    { name: "Add About", path: "/adminDash/addabout", icon: <User size={18} /> },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/adminlogin");
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-200 flex flex-col shadow-xl">
      {/* PROFILE */}
      <div className="p-6 border-b border-slate-700 text-center">
        <img
          src={
            admin?.profile?.url ||
            "https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
          }
          className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-indigo-500"
        />
        <h3 className="font-semibold text-lg text-white">{admin?.name}</h3>
        <p className="text-sm text-slate-400 truncate">{admin?.email}</p>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                text-sm font-medium transition
                ${
                  active
                    ? "bg-indigo-600 text-white shadow"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
            >
              {item.icon}
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3
                     py-2.5 rounded-lg font-medium
                     text-red-500 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
