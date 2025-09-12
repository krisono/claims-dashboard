import { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description:
    "Claims management dashboard with real-time analytics and insights.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
