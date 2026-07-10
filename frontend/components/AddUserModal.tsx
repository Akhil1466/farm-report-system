"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddUserModal({ onClose, onSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const saveUser = async () => {
    try {
      const response = await fetch(
        "https://farm-report-system-testing.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            role,
          }),
        }
      );

      if (response.ok) {
        alert("✅ User Added Successfully");
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        alert(error.detail || "Failed to add user");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl">

        <h2 className="text-2xl font-bold mb-5">
          ➕ Add User
        </h2>

        <input
          className="border w-full p-3 rounded mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border w-full p-3 rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-3 rounded mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border w-full p-3 rounded mb-5"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Admin</option>
          <option>Manager</option>
          <option>User</option>
        </select>

        <div className="flex gap-3">

          <button
            onClick={saveUser}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}