"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Upload", href: "/upload", icon: "📂" },
  { name: "Reports", href: "/reports", icon: "📑" },
  { name: "History", href: "/history", icon: "📜" },
  { name: "Analytics", href: "/analytics", icon: "📈" },
  { name: "Users", href: "/users", icon: "👥" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    alert("Logged out successfully");

    router.push("/");
  };

  return (
    <aside className="w-64 bg-green-800 text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="text-2xl font-bold p-6 border-b border-green-700">
        🐔 Farm Report System
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-4 py-3 hover:bg-green-700 transition"
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 rounded-lg px-4 py-3 font-semibold transition"
        >
          🚪 Logout
        </button>
      </div>

    </aside>
  );
}