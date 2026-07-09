import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";
import ReportTable from "@/components/ReportTable";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <Navbar />

        <main className="p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Dashboard Overview
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, Admin 👋
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-gray-500">📂 Total Uploads</h3>

              <h1 className="text-4xl font-bold text-blue-600 mt-4">
                125
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Uploaded Excel Files
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-gray-500">📑 Reports Generated</h3>

              <h1 className="text-4xl font-bold text-green-600 mt-4">
                98
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Successfully Generated
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-gray-500">👥 Users</h3>

              <h1 className="text-4xl font-bold text-purple-600 mt-4">
                8
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Active Users
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-gray-500">✅ Success Rate</h3>

              <h1 className="text-4xl font-bold text-orange-600 mt-4">
                99%
              </h1>

              <p className="text-sm text-gray-400 mt-2">
                Report Success
              </p>
            </div>

          </div>

          {/* Upload Section */}
          <UploadBox />

          {/* Recent Reports */}
          <ReportTable />

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 font-semibold">
                📂 Upload New Excel
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 font-semibold">
                📑 Generate Report
              </button>

              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 font-semibold">
                📥 Download Latest Report
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}