import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { format } from "date-fns";

/**
 * CouponUsageChart component for visualizing redemption data
 * @param {Object} props
 * @param {Array} props.data - Array of usage data points
 * @returns {JSX.Element}
 */
export const CouponUsageChart = ({ data }) => {
  // Transform data for charting
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item) => ({
      date: format(new Date(item.date), "MMM dd"),
      count: item.count,
      // Color based on usage intensity
      color:
        item.count > 10 ? "#10b981" : item.count > 5 ? "#f59e0b" : "#ef4444",
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No usage data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background p-3 border rounded shadow-sm">
                    <p className="font-medium">{payload[0].payload.date}</p>
                    <p className="text-sm">
                      Redemptions:{" "}
                      <span className="font-semibold">{payload[0].value}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">High usage</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-muted-foreground">Medium usage</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Low usage</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Sample data format for the chart:
 * [
 *   { date: '2023-01-01', count: 5 },
 *   { date: '2023-01-02', count: 12 },
 *   ...
 * ]
 */
