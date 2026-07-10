"use client";

import DashboardChart from "@/components/DashboardChart";

export default function AnalyticsPage() {
  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        📈 Analytics Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Reports</h3>
          <p className="text-4xl font-bold text-green-700">128</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Today's Uploads</h3>
          <p className="text-4xl font-bold text-blue-700">14</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-4xl font-bold text-purple-700">8</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Downloads</h3>
          <p className="text-4xl font-bold text-red-700">350</p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Monthly Report Generation
        </h2>

        <DashboardChart />

      </div>

    </main>
  );
}