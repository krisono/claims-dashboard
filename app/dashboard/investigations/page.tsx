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
import {
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  FileText,
} from "lucide-react";

interface Investigation {
  id: string;
  claimId: string;
  type: string;
  status: "In Progress" | "Completed" | "On Hold" | "Closed";
  assignee: string;
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  description: string;
}

const INITIAL_INVESTIGATIONS: Investigation[] = [
  {
    id: "INV-001",
    claimId: "CLM-001845",
    type: "Fraud Investigation",
    status: "In Progress",
    assignee: "Detective Smith",
    priority: "High",
    createdAt: "2024-01-15",
    description: "Suspicious activity detected — multiple inconsistencies in medical claim submission. Patient history does not match reported injury date.",
  },
  {
    id: "INV-002",
    claimId: "CLM-001840",
    type: "Damage Assessment",
    status: "In Progress",
    assignee: "Investigator Jones",
    priority: "High",
    createdAt: "2024-01-12",
    description: "Vehicle theft claim with conflicting GPS data. Requires field verification and witness interviews.",
  },
  {
    id: "INV-003",
    claimId: "CLM-001835",
    type: "Liability Review",
    status: "In Progress",
    assignee: "Senior Adjuster Kim",
    priority: "High",
    createdAt: "2024-01-08",
    description: "Product liability claim involving alleged manufacturing defect. Awaiting independent technical assessment.",
  },
  {
    id: "INV-004",
    claimId: "CLM-001842",
    type: "Property Inspection",
    status: "On Hold",
    assignee: "Field Inspector Brown",
    priority: "Medium",
    createdAt: "2024-01-10",
    description: "Water damage claim pending contractor assessment. Homeowner schedule conflicts delaying site visit.",
  },
  {
    id: "INV-005",
    claimId: "CLM-001846",
    type: "Document Verification",
    status: "Completed",
    assignee: "Analyst Davis",
    priority: "Medium",
    createdAt: "2024-01-09",
    description: "Property damage claim documents verified and approved. All supporting evidence consistent with reported incident.",
  },
];

const STATUS_STYLES: Record<Investigation["status"], { badge: string; icon: typeof Clock }> = {
  "In Progress": { badge: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  "Completed": { badge: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  "On Hold": { badge: "bg-gray-100 text-gray-700 border-gray-200", icon: AlertTriangle },
  "Closed": { badge: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

const PRIORITY_STYLES: Record<Investigation["priority"], string> = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-blue-100 text-blue-700 border-blue-200",
  Low: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function InvestigationsPage() {
  const { addToast } = useToast();
  const [investigations, setInvestigations] = useState<Investigation[]>(INITIAL_INVESTIGATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = investigations.filter((inv) => {
    const matchSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: Investigation["status"]) => {
    setInvestigations((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
    addToast({
      title: "Status Updated",
      description: `${id} marked as ${newStatus}.`,
      variant: newStatus === "Completed" ? "success" : "default",
    });
  };

  const handleNewInvestigation = () => {
    const newInv: Investigation = {
      id: `INV-${String(investigations.length + 1).padStart(3, "0")}`,
      claimId: `CLM-${String(Math.floor(Math.random() * 90000) + 10000)}`,
      type: "Fraud Investigation",
      status: "In Progress",
      assignee: "Unassigned",
      priority: "Medium",
      createdAt: new Date().toISOString().split("T")[0] ?? "",
      description: "New investigation opened. Awaiting assignment and initial review.",
    };
    setInvestigations((prev) => [newInv, ...prev]);
    addToast({
      title: "Investigation Created",
      description: `${newInv.id} has been opened and queued for assignment.`,
      variant: "success",
    });
  };

  const statusCounts = {
    "In Progress": investigations.filter((i) => i.status === "In Progress").length,
    "Completed": investigations.filter((i) => i.status === "Completed").length,
    "On Hold": investigations.filter((i) => i.status === "On Hold").length,
    "Closed": investigations.filter((i) => i.status === "Closed").length,
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Investigations</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and track ongoing fraud investigations
          </p>
        </div>
        <Button onClick={handleNewInvestigation} className="inline-flex items-center gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          New Investigation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {(["In Progress", "Completed", "On Hold", "Closed"] as const).map((s) => {
          const { badge, icon: Icon } = STATUS_STYLES[s];
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "All" : s)}
              className={`rounded-xl border p-4 text-left transition-all hover:shadow-sm ${
                statusFilter === s ? "ring-2 ring-primary shadow-sm" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{statusCounts[s]}</span>
              </div>
              <p className="text-xs text-muted-foreground">{s}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ID, claim, assignee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Investigation Cards */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 rounded-xl border">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-base font-semibold">No investigations found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
          </div>
        ) : (
          filtered.map((investigation) => {
            const { badge, icon: StatusIcon } = STATUS_STYLES[investigation.status];
            return (
              <Card key={investigation.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-orange-500/10 p-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-base">{investigation.id}</CardTitle>
                          <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {investigation.claimId}
                          </span>
                        </div>
                        <CardDescription className="text-xs mt-0.5">{investigation.type}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {investigation.status}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          PRIORITY_STYLES[investigation.priority]
                        }`}
                      >
                        {investigation.priority}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {investigation.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{investigation.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Opened {investigation.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {investigation.status === "In Progress" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(investigation.id, "On Hold")}
                          >
                            Put On Hold
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(investigation.id, "Completed")}
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            Complete
                          </Button>
                        </>
                      )}
                      {investigation.status === "On Hold" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(investigation.id, "In Progress")}
                        >
                          Resume
                        </Button>
                      )}
                      {investigation.status === "Completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(investigation.id, "Closed")}
                        >
                          Close Case
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          addToast({
                            title: `${investigation.id} Details`,
                            description: `Claim ${investigation.claimId} — ${investigation.type}`,
                          })
                        }
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
