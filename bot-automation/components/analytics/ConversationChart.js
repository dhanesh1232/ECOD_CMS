"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Mon", chats: 80 },
  { date: "Tue", chats: 130 },
  { date: "Wed", chats: 100 },
  { date: "Thu", chats: 150 },
  { date: "Fri", chats: 90 },
  { date: "Sat", chats: 70 },
  { date: "Sun", chats: 120 },
];

export default function ConversationChart() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">
        Conversations (Last 7 Days)
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="chats"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
