export default function Navbar() {
  return (
    <header className="bg-white h-16 shadow flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-green-700">
        Farm Report Dashboard
      </h1>

      <div className="flex items-center gap-6">
        <span>🔔</span>
        <span>👤 Admin</span>
      </div>
    </header>
  );
}