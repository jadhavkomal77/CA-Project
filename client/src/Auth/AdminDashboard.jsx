import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaList,
  FaImage,
  FaInfoCircle,
  FaCogs,
  FaClipboardList,
  FaProjectDiagram,
  FaMoneyBillWave,
  FaAddressBook,
  FaWhatsapp,
  FaTools,
} from "react-icons/fa";

import {
  useAdminLogoutMutation,
  useAdminProfileQuery,
} from "../redux/apis/adminApi";
import { toast } from "react-toastify";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [logoutApi] = useAdminLogoutMutation();
  const { data } = useAdminProfileQuery();
  const admin = data?.admin;


const menu = [
  // DASHBOARD
  { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt />,},
  { name: "Profile", path: "/admin/profile",icon: <FaUser />,},
  {name: "Navbar",path: "/admin/navbar",icon: <FaList />,},
  {name: "Hero",path: "/admin/hero",icon: <FaImage />,},
  {name: "About",path: "/admin/about",icon: <FaInfoCircle />,},
  { name: "Add Services", path: "/admin/addservices", icon: <FaCogs />,},
  {name: "Services List",path: "/admin/serviceslist",icon: <FaTools />,},
  {name: "Projects",path: "/admin/projects",icon: <FaProjectDiagram />,},
  {name: "calculater",path: "/admin/calculater",icon: <FaProjectDiagram />,},

  {name: "Contacts",path: "/admin/contacts",icon: <FaAddressBook />,},
  {name: "WhatsApp", path: "/admin/whatsappsettings",icon: <FaWhatsapp />,},
  {name: "Footer", path: "/admin/footer", icon: <FaList />, },
];



  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      toast.success("Logout successful");
      navigate("/adminlogin");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-[#0F172A] text-white flex items-center justify-between px-4 z-50">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <FaBars
          className="text-2xl cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-[#0F172A] text-white
          flex flex-col px-4 py-6 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close (mobile) */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-sm bg-red-600 px-3 py-1 rounded"
          >
            ✕ Close
          </button>
        </div>

        {/* ADMIN INFO */}
        <div className="text-center mb-6">
          <img
            src={
              admin?.profile?.url ||
              "https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
            }
            className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-indigo-500"
            alt="Admin"
          />
          <h3 className="font-semibold">{admin?.name}</h3>
          <p className="text-sm text-gray-400 truncate">{admin?.email}</p>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  flex items-center gap-4 w-full px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${active ? "bg-indigo-600 shadow" : "hover:bg-gray-700"}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 p-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* ================= OVERLAY (Mobile) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto p-6 mt-14 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
