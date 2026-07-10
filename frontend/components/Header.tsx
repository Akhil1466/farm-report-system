"use client";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-5 rounded-xl mb-8 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold text-green-700">
          SNEHA Farms Private Limited
        </h1>

        <p className="text-gray-500">
          Farm Report Management System
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="text-2xl">
          🔔
        </button>

        <div className="text-right">
          <h3 className="font-bold">Admin</h3>
          <p className="text-gray-500 text-sm">
            Administrator
          </p>
        </div>

      </div>

    </header>
  );
}