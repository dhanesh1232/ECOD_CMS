"use client";
import AnalyticsOverview from "@/components/analytics/AnalyticsOverview";
import ConversationChart from "@/components/analytics/ConversationChart";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <AnalyticsOverview />
      <ConversationChart />
    </div>
  );
}
