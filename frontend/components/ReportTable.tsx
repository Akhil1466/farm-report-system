"use client";

import { useEffect, useState } from "react";

const API_URL = "https://farm-report-system.onrender.com";

interface Report {
  id: number;
  filename: string;
  report_name: string;
  created_at: string;
}

export default function ReportTable() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await fetch(`${API_URL}/reports`);

      if (!response.ok) {
        throw new Error("Failed to load reports");
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mt-8 p-6">
      <h2 className="text-2xl font-bold mb-5">
        Recent Reports
      </h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">File Name</th>
              <th className="text-left py-3">Report</th>
              <th className="text-left py-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500">
                  No Reports Found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="border-b">
                  <td className="py-4">{report.filename}</td>
                  <td>{report.report_name}</td>
                  <td>
                    {new Date(report.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}