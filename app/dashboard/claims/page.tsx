import { Metadata } from "next";
import { ClaimsTable } from "@/components/dashboard/claims-table";

export const metadata: Metadata = {
  title: "Claims Queue",
  description: "Manage and process insurance claims in your queue.",
};

export default function ClaimsPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Claims Queue
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and process insurance claims in your queue.
        </p>
      </div>
      <ClaimsTable />
    </div>
  );
}
