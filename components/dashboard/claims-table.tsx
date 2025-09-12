"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
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
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

// Demo data - in production this would come from the API
const mockClaims = [
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
  },
];

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    SUBMITTED: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    UNDER_REVIEW: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    INVESTIGATION: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
    },
    APPROVED: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
    },
    REJECTED: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
    },
    SETTLED: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.SUBMITTED;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const priorityConfig = {
    LOW: "bg-gray-500",
    MEDIUM: "bg-blue-500",
    HIGH: "bg-orange-500",
    CRITICAL: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold text-white ${
        priorityConfig[priority as keyof typeof priorityConfig] || "bg-gray-500"
      }`}
    >
      {priority}
    </span>
  );
}

function FraudScoreIndicator({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score < 25) return "text-green-600";
    if (score < 50) return "text-yellow-600";
    if (score < 75) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="flex items-center space-x-1">
      <AlertTriangle className={`h-4 w-4 ${getColor(score)}`} />
      <span className={`text-sm font-medium ${getColor(score)}`}>
        {score.toFixed(0)}%
      </span>
    </div>
  );
}

export function ClaimsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);

  // Handler functions
  const handleCreateClaim = () => {
    alert(
      "Create New Claim dialog would open here. This is a demo implementation."
    );
  };

  const handleExport = () => {
    alert(
      "Export functionality would download CSV/Excel file. This is a demo implementation."
    );
  };

  const handleBulkApprove = () => {
    if (selectedClaims.length === 0) {
      alert("Please select claims to approve.");
      return;
    }
    alert(
      `Bulk approve ${selectedClaims.length} claims. This is a demo implementation.`
    );
  };

  const handleFraudInvestigation = () => {
    if (selectedClaims.length === 0) {
      alert("Please select claims to investigate.");
      return;
    }
    alert(
      `Start fraud investigation for ${selectedClaims.length} claims. This is a demo implementation.`
    );
  };

  const handleClaimSelection = (claimId: string) => {
    setSelectedClaims((prev) =>
      prev.includes(claimId)
        ? prev.filter((id) => id !== claimId)
        : [...prev, claimId]
    );
  };

  const handleSelectAll = () => {
    setSelectedClaims(
      selectedClaims.length === claims.length
        ? []
        : claims.map((claim) => claim.id)
    );
  };

  // In a real app, this would be an API call
  const { data: claims = mockClaims, isLoading } = useQuery({
    queryKey: ["claims", searchTerm, statusFilter, priorityFilter],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockClaims.filter((claim) => {
        const matchesSearch =
          claim.claimantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || claim.status === statusFilter;
        const matchesPriority =
          priorityFilter === "ALL" || claim.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      });
    },
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="INVESTIGATION">Investigation</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {selectedClaims.length > 0 && (
            <>
              <button
                onClick={handleBulkApprove}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <span>Bulk Approve ({selectedClaims.length})</span>
              </button>
              <button
                onClick={handleFraudInvestigation}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <span>Fraud Investigation</span>
              </button>
            </>
          )}
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-input rounded-md bg-background hover:bg-accent"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={handleCreateClaim}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            <span>New Claim</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedClaims.length === claims.length &&
                      claims.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedClaims(claims.map((claim) => claim.id));
                      } else {
                        setSelectedClaims([]);
                      }
                    }}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Claim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Claimant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Fraud Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
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
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedClaims.includes(claim.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedClaims([...selectedClaims, claim.id]);
                        } else {
                          setSelectedClaims(
                            selectedClaims.filter((id) => id !== claim.id)
                          );
                        }
                      }}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium">
                        {claim.claimNumber}
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-[150px]">
                        {claim.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium">
                        {claim.claimantName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {claim.incidentType.replace("_", " ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-semibold">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      {formatCurrency(claim.claimAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={claim.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {claim.assignee ? (
                      <span className="text-foreground">
                        {claim.assignee.name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground italic">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FraudScoreIndicator score={claim.fraudScore} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(claim.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-destructive p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground p-1 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {claims.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No claims found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {claims.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {claims.length} of {claims.length} claims
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-input rounded text-sm hover:bg-accent">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-input rounded text-sm hover:bg-accent">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
