"use client";

import { useState } from "react";

const API_URL = "https://farm-report-system.onrender.com";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Report1.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);

      alert("✅ Report Generated Successfully");

      setFile(null);
    } catch (error) {
      console.error(error);
      alert("❌ Report Generation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Upload Excel File
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="w-full border rounded-lg p-3"
        onChange={(e) => {
          if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && (
        <p className="mt-4 text-green-700 font-semibold">
          📄 {file.name}
        </p>
      )}

      <button
        onClick={uploadFile}
        disabled={loading}
        className="mt-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Generating Report..." : "Generate Report"}
      </button>

    </div>
  );
}