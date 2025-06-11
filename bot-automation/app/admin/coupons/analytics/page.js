"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast-provider";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function CouponAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const isRefreshing = analytics !== null;
    try {
      isRefreshing ? setRefreshing(true) : setLoading(true);

      const response = await fetch("/api/admin/coupons/analytics");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch analytics");
      }

      setAnalytics(data.analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      isRefreshing ? setRefreshing(false) : setLoading(false);
    }
  };

  const renderMetricCard = (title, value, description) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="h-[400px]">
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="h-full">
                <Skeleton className="h-full w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container mx-auto py-8 px-4 flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-muted-foreground">No analytics data available</p>
        <Button onClick={fetchAnalytics} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  const statusData = [
    { name: "Active", value: analytics.activeCoupons },
    { name: "Expired", value: analytics.expiredCoupons },
    { name: "Upcoming", value: analytics.upComing },
    {
      name: "Archived",
      value:
        analytics.totalCoupons -
        analytics.activeCoupons -
        analytics.expiredCoupons -
        analytics.upComing,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Coupon Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <Button
          onClick={fetchAnalytics}
          variant="outline"
          size="sm"
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {renderMetricCard("Total Coupons", analytics.totalCoupons)}
        {renderMetricCard(
          "Active Coupons",
          analytics.activeCoupons,
          `${Math.round(
            (analytics.activeCoupons / analytics.totalCoupons) * 100
          )}% of total`
        )}
        {renderMetricCard("Expired Coupons", analytics.expiredCoupons)}
        {renderMetricCard("Upcoming Coupons", analytics.upComing)}
        {renderMetricCard("Total Redemptions", analytics.totalRedemptions)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Coupon Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => (
                    <text
                      x={0}
                      y={0}
                      dy={8}
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-xs"
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  )}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => (
                    <div className="bg-background p-2 border rounded-lg shadow-lg">
                      <p className="font-medium">{payload?.[0]?.name}</p>
                      <p className="text-sm">
                        {payload?.[0]?.value} coupons (
                        {(payload?.[0]?.payload.percent || 0) * 100}%)
                      </p>
                    </div>
                  )}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span className="text-muted-foreground text-sm">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-3">
            <div className="flex flex-wrap gap-2">
              {statusData.map((status, index) => (
                <div key={status.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {status.name}: {status.value}
                  </span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Top Coupons by Redemptions</CardTitle>
              <Badge variant="secondary">
                Top {analytics.topCoupons.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.topCoupons}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60, // Extra space for rotated labels
                }}
                layout="vertical" // Makes bars horizontal
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <YAxis
                  dataKey="code"
                  type="category"
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ payload }) => (
                    <div className="bg-background p-2 border rounded-lg shadow-lg">
                      <p className="font-medium">
                        {payload?.[0]?.payload.code}
                      </p>
                      <p className="text-sm">
                        Redemptions: {payload?.[0]?.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payload?.[0]?.payload.title}
                      </p>
                    </div>
                  )}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => (
                    <span className="text-muted-foreground text-sm">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  dataKey="usedCount"
                  name="Redemptions"
                  fill="#8884d8"
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                >
                  {analytics.topCoupons.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
