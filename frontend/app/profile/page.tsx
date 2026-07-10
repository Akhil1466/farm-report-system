"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setRole(localStorage.getItem("role") || "");
  }, []);

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        👤 My Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">

        <div className="flex items-center gap-6 mb-8">

          <img
            src="/sneha-logo.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-green-600 p-2 bg-white"
          />

          <div>

            <h2 className="text-2xl font-bold">
              {username}
            </h2>

            <p className="text-gray-500">
              {role}
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>
            <label className="font-semibold">
              Username
            </label>

            <input
              className="border rounded-lg w-full p-3 mt-2"
              value={username}
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">
              Role
            </label>

            <input
              className="border rounded-lg w-full p-3 mt-2"
              value={role}
              readOnly
            />
          </div>

          <button
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
          >
            Change Password
          </button>

        </div>

      </div>

    </main>
  );
}