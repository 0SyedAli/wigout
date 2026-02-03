"use client";

import AdminSidebar from "@/components/admin/sidebar";
import AdminTopbar from "@/components/admin/topbar";

export default function AdminDashboardLayout({ children }) {

  return (
    <div className="dashboard_container" >
      <AdminSidebar />

      <div className="dashboard_panel" >

        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}

