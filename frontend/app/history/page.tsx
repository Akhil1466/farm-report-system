"use client";

import { useEffect, useState } from "react";

interface Report {
  id: number;
  filename: string;
  report_name: string;
  uploaded_by: number;
}

export default function HistoryPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await fetch(
        "https://farm-report-system-testing.onrender.com/reports"
      );

      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = reports.filter((r) =>
    r.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          📜 Upload History
        </h1>

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">File Name</th>
              <th className="text-left py-3">Report</th>
              <th className="text-left py-3">Uploaded By</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((report) => (

              <tr
                key={report.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">
                  {report.filename}
                </td>

                <td>
                  {report.report_name}
                </td>

                <td>
                  User #{report.uploaded_by}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}