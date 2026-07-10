"use client";

export default function SettingsPage() {
  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        ⚙ Settings
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

        <div>
          <label className="font-semibold">
            Company Name
          </label>

          <input
            className="border w-full p-3 rounded-lg mt-2"
            defaultValue="SNEHA Farms Private Limited"
          />
        </div>

        <div>
          <label className="font-semibold">
            System Name
          </label>

          <input
            className="border w-full p-3 rounded-lg mt-2"
            defaultValue="Farm Report Management System"
          />
        </div>

        <div>
          <label className="font-semibold">
            Contact Email
          </label>

          <input
            className="border w-full p-3 rounded-lg mt-2"
            defaultValue="admin@snehafarms.com"
          />
        </div>

        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg">
          Save Settings
        </button>

      </div>

    </main>
  );
}