"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReportsPage() {
  const [reports] = useState([
    {
      id: "RPT-001",
      title: "Monthly Claims Summary",
      type: "Financial",
      generatedAt: "2024-01-31",
      status: "Generated",
      fileSize: "2.3 MB",
    },
    {
      id: "RPT-002",
      title: "Fraud Detection Analysis",
      type: "Security",
      generatedAt: "2024-01-28",
      status: "Generated",
      fileSize: "1.8 MB",
    },
    {
      id: "RPT-003",
      title: "Claims Processing Performance",
      type: "Operations",
      generatedAt: "2024-01-25",
      status: "Generating",
      fileSize: "Pending",
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Generate and manage business reports
        </p>
      </div>

      <div className="mb-6">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Generate New Report
        </button>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === "Generated"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <CardDescription>
                {report.type} Report • {report.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Generated</p>
                  <p className="font-medium">{report.generatedAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium">{report.fileSize}</p>
                </div>
                <div>
                  {report.status === "Generated" && (
                    <button className="text-primary hover:underline">
                      Download Report
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
