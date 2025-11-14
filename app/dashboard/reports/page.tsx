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
  const [reports, setReports] = useState([
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

  const handleGenerateReport = () => {
    const reportTypes = ["Financial", "Security", "Operations", "Compliance"];
    const reportTitles = [
      "Quarterly Claims Analysis",
      "Risk Assessment Report",
      "Processing Efficiency Report",
      "Vendor Performance Report",
    ];

    const randomType =
      reportTypes[Math.floor(Math.random() * reportTypes.length)];
    const randomTitle =
      reportTitles[Math.floor(Math.random() * reportTitles.length)];
    const today = new Date().toISOString().split("T")[0];

    const newReport = {
      id: `RPT-${String(reports.length + 1).padStart(3, "0")}`,
      title: randomTitle,
      type: randomType,
      generatedAt: today,
      status: "Generating",
      fileSize: "Pending",
    };

    setReports([newReport, ...reports]);

    // Simulate report generation completion
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === newReport.id
            ? {
                ...r,
                status: "Generated",
                fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
              }
            : r
        )
      );
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Reports</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Generate and manage business reports
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <button
          onClick={handleGenerateReport}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm sm:text-base w-full sm:w-auto transition-colors"
        >
          Generate New Report
        </button>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-base sm:text-lg">
                  {report.title}
                </CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                    report.status === "Generated"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <CardDescription className="text-sm">
                {report.type} Report • {report.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Generated</p>
                  <p className="font-medium text-sm sm:text-base">
                    {report.generatedAt}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium text-sm sm:text-base">
                    {report.fileSize}
                  </p>
                </div>
                <div className="sm:col-span-1 col-span-2">
                  {report.status === "Generated" && (
                    <button
                      onClick={() => alert(`Downloading ${report.title}...`)}
                      className="text-primary hover:underline text-sm sm:text-base"
                    >
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
