"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", reports: 10 },
  { month: "Feb", reports: 20 },
  { month: "Mar", reports: 15 },
  { month: "Apr", reports: 30 },
  { month: "May", reports: 25 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="reports" fill="#16a34a" />
      </BarChart>
    </ResponsiveContainer>
  );
}