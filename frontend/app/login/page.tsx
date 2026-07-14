"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      alert("Enter Username and Password");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }
);
      const text = await response.text();
      console.log("Raw Response:", text);
      const data = JSON.parse(text);
      console.log("Response:", data);
      console.log("Stored Token:", localStorage.getItem("token"));

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        router.push("/dashboard");
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Backend connection failed.");
    } finally {
      setLoading(false);
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
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>
    </main>
  );
}