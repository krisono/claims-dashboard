"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InvestigationsPage() {
  const [investigations] = useState([
    {
      id: "INV-001",
      claimId: "CLM-2024-001",
      type: "Fraud Investigation",
      status: "In Progress",
      assignee: "Detective Smith",
      priority: "High",
      createdAt: "2024-01-15",
      description: "Suspicious activity detected in claim submission",
    },
    {
      id: "INV-002",
      claimId: "CLM-2024-008",
      type: "Damage Assessment",
      status: "Completed",
      assignee: "Investigator Jones",
      priority: "Medium",
      createdAt: "2024-01-10",
      description: "Property damage verification required",
    },
  ]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Investigations</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and track ongoing investigations
        </p>
      </div>

      <div className="grid gap-6">
        {investigations.map((investigation) => (
          <Card key={investigation.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-base sm:text-lg">
                  {investigation.id}
                </CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                    investigation.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {investigation.status}
                </span>
              </div>
              <CardDescription className="text-sm">
                Related Claim: {investigation.claimId} • {investigation.type}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Assignee</p>
                  <p className="font-medium text-sm sm:text-base">
                    {investigation.assignee}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      investigation.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {investigation.priority}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm sm:text-base">
                    {investigation.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
