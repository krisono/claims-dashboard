import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { TimeSeriesData, VendorMetric, DepartmentMetric } from "../lib/api";

interface ChartsProps {
  timeSeries: TimeSeriesData[];
  topVendors: VendorMetric[];
  topDepartments: DepartmentMetric[];
}

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export function ChartsSection({
  timeSeries,
  topVendors,
  topDepartments,
}: ChartsProps) {
  // Transform data for charts
  const chartData = timeSeries.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    claims: item.count,
  }));

  const vendorData = topVendors.slice(0, 6).map((item) => ({
    name:
      item.vendor.length > 15
        ? item.vendor.substring(0, 15) + "..."
        : item.vendor,
    value: item.claimCount,
    fullName: item.vendor,
  }));

  const departmentData = topDepartments.slice(0, 8).map((item) => ({
    name: item.department,
    claims: item.claimCount,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Claims Timeline */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <TrendingUp size={20} />
            Claims Timeline
          </h3>
          <p className="text-sm text-muted">Daily claims over time</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted)" fontSize={12} />
              <YAxis stroke="var(--muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="claims"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#claimsGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Vendors Pie Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <PieChartIcon size={20} />
            Claims by Vendor
          </h3>
          <p className="text-sm text-muted">Distribution across vendors</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vendorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vendorData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  value,
                  props.payload.fullName,
                ]}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Bar Chart */}
      <div className="card lg:col-span-2">
        <div className="card-header">
          <h3 className="card-title">
            <BarChart3 size={20} />
            Claims by Department
          </h3>
          <p className="text-sm text-muted">
            Department-wise claim distribution
          </p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={departmentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                stroke="var(--muted)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="var(--muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="claims"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
