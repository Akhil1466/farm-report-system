"use client";

import { useEffect, useState } from "react";

interface Report {
  id: number;
  filename: string;
  report_name: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await fetch(
        "https://farm-report-system-testing.onrender.com/reports"
      );

      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        📑 Generated Reports
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Source File</th>
              <th className="text-left py-3">Generated Report</th>
              <th className="text-left py-3">Download</th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr key={report.id} className="border-b">

                <td className="py-4">
                  {report.filename}
                </td>

                <td>
                  {report.report_name}
                </td>

                <td>

                  <a
                    href="https://farm-report-system-testing.onrender.com/download"
                    className="bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    ⬇ Download
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}