"use client";

interface Props {
  totalUsers: number;
  totalReports: number;
  activeUsers: number;
  pendingReports: number;
}

export default function DashboardCards({
  totalUsers,
  totalReports,
  activeUsers,
  pendingReports,
}: Props) {
  const cards = [
    {
      title: "Users",
      value: totalUsers,
      icon: "👥",
      color: "bg-blue-600",
    },
    {
      title: "Reports",
      value: totalReports,
      icon: "📑",
      color: "bg-green-600",
    },
    {
      title: "Active",
      value: activeUsers,
      icon: "✅",
      color: "bg-purple-600",
    },
    {
      title: "Pending",
      value: pendingReports,
      icon: "⏳",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white shadow-lg rounded-xl p-6"
        >
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white`}
            >
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}