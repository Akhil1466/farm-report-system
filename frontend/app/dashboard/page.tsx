"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import ReportTable from "@/components/ReportTable";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    total_users: 0,
    total_reports: 0,
    active_users: 0,
    pending_reports: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await fetch(
        "https://farm-report-system-testing.onrender.com/dashboard"
      );
      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-2">Welcome back 👋</p>

          <div className="mt-8">
            <DashboardCards
              totalUsers={dashboard.total_users}
              totalReports={dashboard.total_reports}
              activeUsers={dashboard.active_users}
              pendingReports={dashboard.pending_reports}
            />
          </div>

          <ReportTable />
        </div>
      </div>
    </div>
  );
}