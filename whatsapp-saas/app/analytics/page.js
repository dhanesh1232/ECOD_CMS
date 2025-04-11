import PerformanceMetrics from "@/components/PerformanceMetrics";
import DeliveryRatesChart from "@/components/DeliveryRatesChart";
import ResponseTimes from "@/components/ResponseTimes";
import ExportAnalytics from "@/components/ExportAnalytics";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Message Analytics</h1>
        <ExportAnalytics />
      </div>

      <PerformanceMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <DeliveryRatesChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <ResponseTimes />
        </div>
      </div>
    </div>
  );
}
