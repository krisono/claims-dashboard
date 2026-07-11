"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { Download, Plus, FileText, BarChart3, Shield, Settings, Clock } from "lucide-react";

interface Report {
  id: string;
  title: string;
  type: string;
  generatedAt: string;
  status: string;
  fileSize: string;
}

const TYPE_ICONS: Record<string, typeof FileText> = {
  Financial: BarChart3,
  Security: Shield,
  Operations: Settings,
  Compliance: FileText,
};

export default function ReportsPage() {
  const { addToast } = useToast();
  const [reports, setReports] = useState<Report[]>([
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

  const handleDownload = (report: Report) => {
    const content = `Report: ${report.title}\nType: ${report.type}\nGenerated: ${report.generatedAt}\nID: ${report.id}\n\nThis is a sample report export.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.id}-${report.title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ title: "Download Started", description: `${report.title} is downloading.` });
  };

  const handleGenerateReport = () => {
    const reportTypes = ["Financial", "Security", "Operations", "Compliance"];
    const reportTitles = [
      "Quarterly Claims Analysis",
      "Risk Assessment Report",
      "Processing Efficiency Report",
      "Vendor Performance Report",
    ];

    const randomType =
      reportTypes[Math.floor(Math.random() * reportTypes.length)] ||
      "Financial";
    const randomTitle =
      reportTitles[Math.floor(Math.random() * reportTitles.length)] ||
      "New Report";
    const today = new Date().toISOString().split("T")[0] || "";

    const newReport = {
      id: `RPT-${String(reports.length + 1).padStart(3, "0")}`,
      title: randomTitle,
      type: randomType,
      generatedAt: today,
      status: "Generating",
      fileSize: "Pending",
    };

    setReports([newReport, ...reports]);
    addToast({ title: "Generating Report", description: `${newReport.title} is being generated...` });

    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === newReport.id
            ? {
                ...r,
                status: "Generated",
                fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
              }
            : r,
        ),
      );
      addToast({ title: "Report Ready", description: `${newReport.title} is ready to download.`, variant: "success" });
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
        <Button onClick={handleGenerateReport} className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Generate New Report
        </Button>
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
                <div className="sm:col-span-1 col-span-2 flex items-end">
                  {report.status === "Generated" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(report)}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 animate-pulse" />
                      Generating...
                    </div>
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
