"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  User,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/toaster";
import { CreateClaimModal, type ClaimFormData } from "@/components/dashboard/create-claim-modal";
import { ClaimDetailModal, type Claim } from "@/components/dashboard/claim-detail-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const INITIAL_CLAIMS: Claim[] = [
  {
    id: "1",
    claimNumber: "CLM-001847",
    claimantName: "Sarah Johnson",
    title: "Auto Accident Claim",
    incidentType: "AUTO_ACCIDENT",
    claimAmount: 12450,
    status: "UNDER_REVIEW",
    priority: "HIGH",
    createdAt: "2024-01-15T10:30:00Z",
    assignee: { name: "John Smith" },
    fraudScore: 15,
    description: "Rear-end collision on I-95 resulting in vehicle damage and personal injury.",
  },
  {
    id: "2",
    claimNumber: "CLM-001846",
    claimantName: "Michael Chen",
    title: "Property Damage Claim",
    incidentType: "PROPERTY_DAMAGE",
    claimAmount: 8750,
    status: "APPROVED",
    priority: "MEDIUM",
    createdAt: "2024-01-15T09:15:00Z",
    assignee: { name: "Jane Doe" },
    fraudScore: 5,
  },
  {
    id: "3",
    claimNumber: "CLM-001845",
    claimantName: "Emily Rodriguez",
    title: "Medical Claim",
    incidentType: "MEDICAL",
    claimAmount: 24200,
    status: "INVESTIGATION",
    priority: "CRITICAL",
    createdAt: "2024-01-14T14:45:00Z",
    assignee: { name: "Bob Wilson" },
    fraudScore: 75,
    description: "Emergency hospitalization following workplace accident. Multiple inconsistencies noted.",
  },
  {
    id: "4",
    claimNumber: "CLM-001844",
    claimantName: "David Wilson",
    title: "Theft Claim",
    incidentType: "THEFT",
    claimAmount: 5300,
    status: "REJECTED",
    priority: "LOW",
    createdAt: "2024-01-14T11:20:00Z",
    assignee: { name: "Alice Brown" },
    fraudScore: 8,
  },
  {
    id: "5",
    claimNumber: "CLM-001843",
    claimantName: "Jennifer Davis",
    title: "Fire Damage Claim",
    incidentType: "FIRE",
    claimAmount: 45000,
    status: "SUBMITTED",
    priority: "HIGH",
    createdAt: "2024-01-13T16:10:00Z",
    assignee: null,
    fraudScore: 12,
    description: "Kitchen fire caused extensive damage to property. Fire department report attached.",
  },
  {
    id: "6",
    claimNumber: "CLM-001842",
    claimantName: "Robert Martinez",
    title: "Water Damage Claim",
    incidentType: "WATER_DAMAGE",
    claimAmount: 18500,
    status: "UNDER_REVIEW",
    priority: "HIGH",
    createdAt: "2024-01-12T08:45:00Z",
    assignee: { name: "Sarah Lee" },
    fraudScore: 22,
  },
  {
    id: "7",
    claimNumber: "CLM-001841",
    claimantName: "Lisa Anderson",
    title: "Workplace Injury Claim",
    incidentType: "INJURY",
    claimAmount: 32000,
    status: "APPROVED",
    priority: "MEDIUM",
    createdAt: "2024-01-11T13:20:00Z",
    assignee: { name: "Mike Johnson" },
    fraudScore: 10,
  },
  {
    id: "8",
    claimNumber: "CLM-001840",
    claimantName: "James Thompson",
    title: "Vehicle Theft Claim",
    incidentType: "THEFT",
    claimAmount: 28900,
    status: "INVESTIGATION",
    priority: "CRITICAL",
    createdAt: "2024-01-10T15:30:00Z",
    assignee: { name: "Emma Davis" },
    fraudScore: 65,
  },
  {
    id: "9",
    claimNumber: "CLM-001839",
    claimantName: "Patricia White",
    title: "Slip and Fall Claim",
    incidentType: "INJURY",
    claimAmount: 15750,
    status: "SUBMITTED",
    priority: "MEDIUM",
    createdAt: "2024-01-09T10:15:00Z",
    assignee: null,
    fraudScore: 18,
  },
  {
    id: "10",
    claimNumber: "CLM-001838",
    claimantName: "Christopher Brown",
    title: "Hail Damage Claim",
    incidentType: "WEATHER",
    claimAmount: 9200,
    status: "APPROVED",
    priority: "LOW",
    createdAt: "2024-01-08T14:00:00Z",
    assignee: { name: "Tom Harris" },
    fraudScore: 3,
  },
  {
    id: "11",
    claimNumber: "CLM-001837",
    claimantName: "Amanda Garcia",
    title: "Burglary Claim",
    incidentType: "THEFT",
    claimAmount: 12300,
    status: "UNDER_REVIEW",
    priority: "HIGH",
    createdAt: "2024-01-07T09:40:00Z",
    assignee: { name: "Lisa Chen" },
    fraudScore: 38,
  },
  {
    id: "12",
    claimNumber: "CLM-001836",
    claimantName: "Kevin Taylor",
    title: "Windstorm Damage Claim",
    incidentType: "WEATHER",
    claimAmount: 22400,
    status: "SETTLED",
    priority: "MEDIUM",
    createdAt: "2024-01-06T11:25:00Z",
    assignee: { name: "Rachel Green" },
    fraudScore: 7,
  },
  {
    id: "13",
    claimNumber: "CLM-001835",
    claimantName: "Michelle Lee",
    title: "Product Liability Claim",
    incidentType: "LIABILITY",
    claimAmount: 41000,
    status: "INVESTIGATION",
    priority: "CRITICAL",
    createdAt: "2024-01-05T16:50:00Z",
    assignee: { name: "David Kim" },
    fraudScore: 52,
  },
  {
    id: "14",
    claimNumber: "CLM-001834",
    claimantName: "Daniel Moore",
    title: "Vandalism Claim",
    incidentType: "PROPERTY_DAMAGE",
    claimAmount: 6800,
    status: "APPROVED",
    priority: "LOW",
    createdAt: "2024-01-04T12:10:00Z",
    assignee: { name: "Anna Wilson" },
    fraudScore: 12,
  },
  {
    id: "15",
    claimNumber: "CLM-001833",
    claimantName: "Jessica Harris",
    title: "Medical Malpractice Claim",
    incidentType: "MEDICAL",
    claimAmount: 85000,
    status: "INVESTIGATION",
    priority: "CRITICAL",
    createdAt: "2024-01-03T08:30:00Z",
    assignee: { name: "Chris Martinez" },
    fraudScore: 45,
    description: "Alleged surgical error resulting in prolonged recovery and additional medical costs.",
  },
];

const STATUS_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  SUBMITTED: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  UNDER_REVIEW: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  INVESTIGATION: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  APPROVED: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  REJECTED: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  SETTLED: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" },
};

const PRIORITY_BADGE: Record<string, string> = {
  LOW: "bg-gray-500",
  MEDIUM: "bg-blue-500",
  HIGH: "bg-orange-500",
  CRITICAL: "bg-red-500",
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_BADGE[status] ?? STATUS_BADGE["SUBMITTED"]!;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold text-white ${
        PRIORITY_BADGE[priority] ?? "bg-gray-500"
      }`}
    >
      {priority}
    </span>
  );
}

function FraudScore({ score }: { score: number }) {
  const color =
    score < 25
      ? "text-green-600"
      : score < 50
      ? "text-yellow-600"
      : score < 75
      ? "text-orange-600"
      : "text-red-600";
  return (
    <div className="flex items-center gap-1">
      <AlertTriangle className={`h-3.5 w-3.5 ${color}`} />
      <span className={`text-sm font-medium ${color}`}>{score}%</span>
    </div>
  );
}

let nextIdCounter = 16;

export function ClaimsTable() {
  const { addToast } = useToast();

  const [allClaims, setAllClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editClaim, setEditClaim] = useState<Claim | null>(null);
  const [viewClaim, setViewClaim] = useState<Claim | null>(null);

  const claims = useMemo(() => {
    return allClaims.filter((claim) => {
      const matchesSearch =
        claim.claimantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || claim.status === statusFilter;
      const matchesPriority = priorityFilter === "ALL" || claim.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [allClaims, searchTerm, statusFilter, priorityFilter]);

  const handleCreateSubmit = (data: ClaimFormData) => {
    const newClaim: Claim = {
      id: String(nextIdCounter++),
      claimNumber: `CLM-${String(Math.floor(Math.random() * 90000) + 10000)}`,
      claimantName: data.claimantName,
      title: data.title,
      incidentType: data.incidentType,
      claimAmount: parseFloat(data.claimAmount),
      status: "SUBMITTED",
      priority: data.priority,
      createdAt: new Date().toISOString(),
      assignee: data.assignee ? { name: data.assignee } : null,
      fraudScore: Math.floor(Math.random() * 30),
      description: data.description || undefined,
    };
    setAllClaims((prev) => [newClaim, ...prev]);
    setCreateOpen(false);
    addToast({
      title: "Claim Created",
      description: `${newClaim.claimNumber} has been submitted successfully.`,
      variant: "success",
    });
  };

  const handleEditSubmit = (data: ClaimFormData) => {
    if (!editClaim) return;
    setAllClaims((prev) =>
      prev.map((c) =>
        c.id === editClaim.id
          ? {
              ...c,
              claimantName: data.claimantName,
              title: data.title,
              incidentType: data.incidentType,
              claimAmount: parseFloat(data.claimAmount),
              priority: data.priority,
              assignee: data.assignee ? { name: data.assignee } : null,
              description: data.description || undefined,
            }
          : c
      )
    );
    setEditClaim(null);
    addToast({
      title: "Claim Updated",
      description: `${editClaim.claimNumber} has been updated successfully.`,
      variant: "success",
    });
  };

  const handleStatusChange = (claimId: string, newStatus: string) => {
    setAllClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: newStatus } : c))
    );
    setViewClaim((prev) => (prev && prev.id === claimId ? { ...prev, status: newStatus } : prev));
    addToast({
      title: "Status Updated",
      description: `Claim status changed to ${newStatus.replace(/_/g, " ")}.`,
    });
  };

  const handleDelete = (claimId: string) => {
    const claim = allClaims.find((c) => c.id === claimId);
    setAllClaims((prev) => prev.filter((c) => c.id !== claimId));
    setSelectedClaims((prev) => prev.filter((id) => id !== claimId));
    addToast({
      title: "Claim Deleted",
      description: `${claim?.claimNumber ?? "Claim"} has been removed.`,
      variant: "destructive",
    });
  };

  const handleExport = () => {
    const headers = ["Claim #", "Claimant", "Title", "Type", "Amount", "Status", "Priority", "Date"];
    const rows = claims.map((c) => [
      c.claimNumber,
      c.claimantName,
      `"${c.title}"`,
      c.incidentType,
      c.claimAmount.toString(),
      c.status,
      c.priority,
      formatDate(c.createdAt),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `claims-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ title: "Export Complete", description: `${claims.length} claims exported to CSV.` });
  };

  const handleBulkApprove = () => {
    if (selectedClaims.length === 0) {
      addToast({ title: "No Claims Selected", description: "Select at least one claim to approve.", variant: "warning" });
      return;
    }
    setAllClaims((prev) =>
      prev.map((c) => (selectedClaims.includes(c.id) ? { ...c, status: "APPROVED" } : c))
    );
    addToast({
      title: "Claims Approved",
      description: `${selectedClaims.length} claim${selectedClaims.length > 1 ? "s" : ""} marked as Approved.`,
      variant: "success",
    });
    setSelectedClaims([]);
  };

  const handleFraudInvestigation = () => {
    if (selectedClaims.length === 0) {
      addToast({ title: "No Claims Selected", description: "Select at least one claim to investigate.", variant: "warning" });
      return;
    }
    setAllClaims((prev) =>
      prev.map((c) => (selectedClaims.includes(c.id) ? { ...c, status: "INVESTIGATION" } : c))
    );
    addToast({
      title: "Investigation Started",
      description: `${selectedClaims.length} claim${selectedClaims.length > 1 ? "s" : ""} flagged for fraud investigation.`,
      variant: "warning",
    });
    setSelectedClaims([]);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <>
      <CreateClaimModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        mode="create"
      />
      <CreateClaimModal
        open={!!editClaim}
        onClose={() => setEditClaim(null)}
        onSubmit={handleEditSubmit}
        mode="edit"
        initialData={
          editClaim
            ? {
                claimantName: editClaim.claimantName,
                title: editClaim.title,
                incidentType: editClaim.incidentType,
                claimAmount: String(editClaim.claimAmount),
                priority: editClaim.priority,
                assignee: editClaim.assignee?.name ?? "",
                description: editClaim.description ?? "",
              }
            : undefined
        }
      />
      <ClaimDetailModal
        claim={viewClaim}
        open={!!viewClaim}
        onClose={() => setViewClaim(null)}
        onStatusChange={handleStatusChange}
        onEdit={(claim) => {
          setViewClaim(null);
          setEditClaim(claim);
        }}
        onDelete={handleDelete}
      />

      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search claims, claimants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="INVESTIGATION">Investigation</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="SETTLED">Settled</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="ALL">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            {selectedClaims.length > 0 && (
              <>
                <button
                  onClick={handleBulkApprove}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve ({selectedClaims.length})
                </button>
                <button
                  onClick={handleFraudInvestigation}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Investigate ({selectedClaims.length})
                </button>
              </>
            )}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-input rounded-lg bg-background text-sm font-medium hover:bg-accent transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              New Claim
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Showing <span className="font-semibold text-foreground">{claims.length}</span> of{" "}
            <span className="font-semibold text-foreground">{allClaims.length}</span> claims
          </span>
          {selectedClaims.length > 0 && (
            <span className="text-primary font-medium">{selectedClaims.length} selected</span>
          )}
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedClaims.length === claims.length && claims.length > 0}
                      onChange={() =>
                        setSelectedClaims(
                          selectedClaims.length === claims.length ? [] : claims.map((c) => c.id)
                        )
                      }
                      className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                    />
                  </th>
                  {["Claim", "Claimant", "Type", "Amount", "Status", "Priority", "Assignee", "Fraud Risk", "Date", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <motion.tbody
                variants={container}
                initial="hidden"
                animate="show"
                className="divide-y divide-border"
              >
                {claims.map((claim) => (
                  <motion.tr
                    key={claim.id}
                    variants={item}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedClaims.includes(claim.id)}
                        onChange={() =>
                          setSelectedClaims((prev) =>
                            prev.includes(claim.id)
                              ? prev.filter((id) => id !== claim.id)
                              : [...prev, claim.id]
                          )
                        }
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-sm">{claim.claimNumber}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[140px]">{claim.title}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{claim.claimantName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      {claim.incidentType.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-sm font-semibold">
                        <DollarSign className="h-3.5 w-3.5 mr-0.5 text-muted-foreground" />
                        {formatCurrency(claim.claimAmount)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <PriorityBadge priority={claim.priority} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {claim.assignee ? (
                        <span>{claim.assignee.name}</span>
                      ) : (
                        <span className="text-muted-foreground italic text-xs">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <FraudScore score={claim.fraudScore} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(claim.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          title="View details"
                          onClick={() => setViewClaim(claim)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          title="Edit claim"
                          onClick={() => setEditClaim(claim)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              title="More options"
                              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setViewClaim(claim)}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditClaim(claim)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit Claim
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(claim.id, "APPROVED")}>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(claim.id, "INVESTIGATION")}>
                              <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" /> Flag for Investigation
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(claim.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Delete Claim
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {claims.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-semibold mb-1">No claims found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("ALL");
                  setPriorityFilter("ALL");
                }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
