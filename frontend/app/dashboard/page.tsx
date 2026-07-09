import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          <h2 className="text-3xl font-bold">
            Dashboard Overview
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome back, Admin 👋
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold">
                📂 Uploads
              </h3>

              <p className="text-4xl font-bold mt-4">
                25
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold">
                📑 Reports
              </h3>

              <p className="text-4xl font-bold mt-4">
                18
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold">
                👥 Users
              </h3>

              <p className="text-4xl font-bold mt-4">
                3
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold">
                ✅ Success
              </h3>

              <p className="text-4xl font-bold mt-4">
                98%
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}