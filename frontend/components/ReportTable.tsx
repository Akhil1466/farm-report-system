export default function ReportTable() {
  const reports = [
    {
      file: "Farm1.xlsx",
      date: "22-07-2025",
      status: "Completed",
    },
    {
      file: "Farm2.xlsx",
      date: "21-07-2025",
      status: "Completed",
    },
    {
      file: "Farm3.xlsx",
      date: "20-07-2025",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg mt-8 p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Reports
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">File</th>

            <th className="text-left py-3">Date</th>

            <th className="text-left py-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((r) => (

            <tr key={r.file} className="border-b">

              <td className="py-4">{r.file}</td>

              <td>{r.date}</td>

              <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                  {r.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}