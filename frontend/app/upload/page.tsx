"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    alert("Upload function called");

    if (!file) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://farm-report-system-testing.onrender.com/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
  const errorText = await response.text();
  console.log("Status:", response.status);
  console.log("Error:", errorText);

  alert(`Upload Failed: ${response.status}`);
  return;
}

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Report1.xlsx";
      a.click();

      alert("✅ Report Generated Successfully");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        📂 Upload Excel File
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-10">

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => {
            if (e.target.files)
              setFile(e.target.files[0]);
          }}
          className="mb-6"
        />

        {file && (
          <p className="mb-6 text-green-700 font-semibold">
            Selected:
            {" "}
            {file.name}
          </p>
        )}

        <button
          onClick={uploadFile}
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Uploading..." : "Generate Report"}
        </button>

      </div>

    </main>
  );
}