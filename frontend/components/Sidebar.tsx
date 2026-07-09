"use client";

import Link from "next/link";

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
  return (
    <aside className="w-64 bg-green-800 text-white min-h-screen">
      <div className="text-2xl font-bold p-6 border-b border-green-700">
        🐔 Farm Report
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-4 py-3 hover:bg-green-700"
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}