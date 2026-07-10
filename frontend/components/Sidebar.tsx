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
    <aside className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white min-h-screen flex flex-col shadow-2xl">

      {/* Company Logo */}
      <div className="p-6 border-b border-green-700 flex items-center gap-3">

        <img
          src="/sneha-logo.png"
          alt="SNEHA FARMS Logo"
          className="w-14 h-14 rounded-full bg-white p-2 shadow-lg"
        />

        <div>
          <h1 className="text-xl font-bold">
            Sneha Farms Limited
          </h1>

          <p className="text-Red-200 text-sm">
            BIMS
          </p>
        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-green-700 transition-all duration-300 hover:translate-x-1"
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </Link>

        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 rounded-xl px-4 py-3 font-semibold transition-all duration-300"
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}
<div className="p-6 border-b border-green-700 flex items-center gap-3">

  <img
    src="/sneha-logo.png"
    alt="SNEHA Logo"
    className="w-14 h-14 object-contain bg-white rounded-lg p-2 shadow-lg"
  />

  <div>
    <h1 className="text-xl font-bold text-white">
      SNEHA
    </h1>

    <p className="text-green-200 text-sm">
      Farm Report System
    </p>
  </div>

</div>