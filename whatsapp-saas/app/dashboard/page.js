import StatsCard from "@/components/StatsCard";
import RecentMessages from "@/components/RecentMessages";
import MessageChart from "@/components/MessageChart";

export default function Dashboard() {
  const stats = [
    { title: "Total Messages", value: "1,245", change: "+12%" },
    { title: "Delivered", value: "1,189", change: "+8%" },
    { title: "Read Rate", value: "82%", change: "+5%" },
    { title: "Contacts", value: "456", change: "+23%" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MessageChart />
        </div>
        <div>
          <RecentMessages />
        </div>
      </div>
    </div>
  );
}
