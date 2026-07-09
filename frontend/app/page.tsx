"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://farm-report-system.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate report.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Report1.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      alert("✅ Report generated successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error generating report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          🐔 Farm Report System
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Upload Excel and Generate Report
        </p>

        <div className="mt-8">
          <input
            type="file"
            accept=".xlsx,.xls,.xlsm"
            className="w-full border border-gray-300 rounded-lg p-3"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </div>

        {file && (
          <div className="mt-4 text-green-600 font-medium">
            Selected File: {file.name}
          </div>
        )}

        <button
          onClick={generateReport}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? "Generating Report..." : "Generate Report"}
        </button>

      </div>
    </main>
  );
}