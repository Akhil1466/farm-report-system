"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "admin" && password === "admin123") {
      router.push("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="text-center">

          <div className="text-6xl">🐔</div>

          <h1 className="text-3xl font-bold text-green-700 mt-3">
            Farm Report System
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>

        </div>

        <div className="mt-8">

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-lg p-3 mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg"
          >
            Login
          </button>

        </div>

      </div>

    </main>
  );
}