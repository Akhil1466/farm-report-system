import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import ReportTable from "@/components/ReportTable";

export default function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back, Admin 👋
          </p>

          <div className="mt-8">
            <DashboardCards
              totalUsers={1200}
              totalReports={87}
              activeUsers={230}
              pendingReports={14}
            />
          </div>

          <ReportTable />

        </div>

      </div>

    </div>
  );
}