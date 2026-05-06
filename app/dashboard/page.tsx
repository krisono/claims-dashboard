import { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description:
    "Claims-Dash: real-time analytics and insights for claims management.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
