import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 h-screen flex-shrink-0">
        <AdminSidebar />
      </aside>

      {/* CONTENT */}
      <section className="flex-1 h-screen overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;
