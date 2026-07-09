"use client";

import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
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
        throw new Error("Upload failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Report1.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);

      alert("✅ Report Generated Successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Upload Failed");
    }

    setLoading(false);
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
          if (e.target.files) {
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
        className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

    </div>
  );
}