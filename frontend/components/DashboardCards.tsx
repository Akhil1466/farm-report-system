export default function DashboardCards() {
  const cards = [
    {
      title: "Total Uploads",
      value: "125",
      color: "bg-blue-500",
      icon: "📂",
    },
    {
      title: "Reports",
      value: "98",
      color: "bg-green-500",
      icon: "📑",
    },
    {
      title: "Users",
      value: "8",
      color: "bg-purple-500",
      icon: "👥",
    },
    {
      title: "Success",
      value: "99%",
      color: "bg-orange-500",
      icon: "✅",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">{card.title}</p>

              <h2 className="text-4xl font-bold mt-3">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}