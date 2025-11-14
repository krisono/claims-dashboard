"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const kpiData = [
  {
    title: "Total Claims",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: FileText,
    color: "blue",
  },
  {
    title: "Claims Value",
    value: "$4.2M",
    change: "+8.2%",
    trend: "up" as const,
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Pending Review",
    value: "147",
    change: "-3.1%",
    trend: "down" as const,
    icon: Clock,
    color: "orange",
  },
  {
    title: "Fraud Detected",
    value: "23",
    change: "+15.7%",
    trend: "up" as const,
    icon: AlertTriangle,
    color: "red",
  },
];

const recentClaims = [
  {
    id: "CLM-001847",
    claimant: "Sarah Johnson",
    type: "Auto Accident",
    amount: "$12,450",
    status: "Under Review",
    priority: "High",
    date: "2024-01-15",
  },
  {
    id: "CLM-001846",
    claimant: "Michael Chen",
    type: "Property Damage",
    amount: "$8,750",
    status: "Approved",
    priority: "Medium",
    date: "2024-01-15",
  },
  {
    id: "CLM-001845",
    claimant: "Emily Rodriguez",
    type: "Medical",
    amount: "$24,200",
    status: "Investigation",
    priority: "Critical",
    date: "2024-01-14",
  },
  {
    id: "CLM-001844",
    claimant: "David Wilson",
    type: "Theft",
    amount: "$5,300",
    status: "Rejected",
    priority: "Low",
    date: "2024-01-14",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200",
    green: "bg-green-500/10 text-green-600 border-green-200",
    orange: "bg-orange-500/10 text-orange-600 border-orange-200",
    red: "bg-red-500/10 text-red-600 border-red-200",
  };

  return (
    <motion.div
      variants={item}
      className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div
          className={`rounded-lg p-2 ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div
          className={`flex items-center text-xs sm:text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUp
            className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${
              trend === "down" ? "rotate-180" : ""
            }`}
          />
          {change}
        </div>
      </div>
      <div className="mt-3 sm:mt-4">
        <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{title}</p>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClasses = {
    "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-green-100 text-green-800 border-green-200",
    Investigation: "bg-blue-100 text-blue-800 border-blue-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        statusClasses[status as keyof typeof statusClasses] ||
        "bg-gray-100 text-gray-800 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const priorityClasses = {
    Critical: "bg-red-500 text-white",
    High: "bg-orange-500 text-white",
    Medium: "bg-blue-500 text-white",
    Low: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
        priorityClasses[priority as keyof typeof priorityClasses] ||
        "bg-gray-500 text-white"
      }`}
    >
      {priority}
    </span>
  );
}

import { LastUpdated } from "@/components/ui/last-updated";
import { ClientDate } from "@/components/ui/client-date";

export function DashboardOverview() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Welcome back! Here's what's happening with your claims today.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <LastUpdated />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4"
      >
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg border bg-card"
      >
        <div className="border-b px-4 sm:px-6 py-3 sm:py-4">
          <h2 className="text-base sm:text-lg font-semibold">Recent Claims</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Latest claims requiring your attention
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Claimant
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Type
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Priority
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    {claim.id}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="flex items-center">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 sm:mr-3">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="text-xs sm:text-sm font-medium">
                        {claim.claimant}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                    {claim.type}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold">
                    {claim.amount}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                    <PriorityBadge priority={claim.priority} />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                    <ClientDate date={claim.date} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t px-6 py-4">
          <Link
            href="/dashboard/claims"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all claims →
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">New Claim</h3>
              <p className="text-sm text-muted-foreground">
                Create a new claim entry
              </p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
            Create Claim
          </button>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-green-500/10 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Bulk Approve</h3>
              <p className="text-sm text-muted-foreground">
                Approve multiple claims
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              alert(
                "Bulk Actions:\n• Approve selected claims\n• Reject selected claims\n• Assign to adjuster\n• Export to CSV"
              );
            }}
            className="mt-4 w-full rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Bulk Actions
          </button>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-orange-500/10 p-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold">Fraud Detection</h3>
              <p className="text-sm text-muted-foreground">
                <button
                  onClick={() => {
                    alert(
                      "Flagged Claims for Review:\n• CLM-2024-001: Suspicious damage patterns\n• CLM-2024-007: Multiple claims from same address\n• CLM-2024-012: High-value claim requiring verification"
                    );
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Review flagged claims
                </button>
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/investigations"
            className="mt-4 w-full rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors inline-block text-center"
          >
            Investigate
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
