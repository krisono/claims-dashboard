"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  User,
  DollarSign,
  Calendar,
  AlertTriangle,
  Tag,
  UserCheck,
  Hash,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export interface Claim {
  id: string;
  claimNumber: string;
  claimantName: string;
  title: string;
  incidentType: string;
  claimAmount: number;
  status: string;
  priority: string;
  createdAt: string;
  assignee: { name: string } | null;
  fraudScore: number;
  description?: string;
}

interface ClaimDetailModalProps {
  claim: Claim | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (claimId: string, newStatus: string) => void;
  onEdit: (claim: Claim) => void;
  onDelete: (claimId: string) => void;
}

const STATUS_OPTIONS = [
  {
    value: "SUBMITTED",
    label: "Submitted",
    icon: Clock,
    color: "text-blue-600 bg-blue-50",
  },
  {
    value: "UNDER_REVIEW",
    label: "Under Review",
    icon: Shield,
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    value: "INVESTIGATION",
    label: "Investigation",
    icon: AlertTriangle,
    color: "text-purple-600 bg-purple-50",
  },
  {
    value: "APPROVED",
    label: "Approved",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
  },
  {
    value: "REJECTED",
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600 bg-red-50",
  },
  {
    value: "SETTLED",
    label: "Settled",
    icon: CheckCircle,
    color: "text-gray-600 bg-gray-50",
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-700 border-gray-200",
  MEDIUM: "bg-blue-100 text-blue-700 border-blue-200",
  HIGH: "bg-orange-100 text-orange-700 border-orange-200",
  CRITICAL: "bg-red-100 text-red-700 border-red-200",
};

function FraudBar({ score }: { score: number }) {
  const color =
    score < 25
      ? "bg-green-500"
      : score < 50
        ? "bg-yellow-500"
        : score < 75
          ? "bg-orange-500"
          : "bg-red-500";
  const label =
    score < 25
      ? "Low Risk"
      : score < 50
        ? "Medium Risk"
        : score < 75
          ? "High Risk"
          : "Critical Risk";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Fraud Risk Score</span>
        <span className="font-semibold">
          {score}% — {label}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ClaimDetailModal({
  claim,
  open,
  onClose,
  onStatusChange,
  onEdit,
  onDelete,
}: ClaimDetailModalProps) {
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  React.useEffect(() => {
    if (!open) setConfirmDelete(false);
  }, [open]);

  if (!claim) return null;

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === claim.status);
  const StatusIcon = currentStatus?.icon ?? Clock;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex items-start justify-between pr-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {claim.claimNumber}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${currentStatus?.color}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {claim.status.replace(/_/g, " ")}
                </span>
              </div>
              <DialogTitle className="text-xl">{claim.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Key Details Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Claim Information
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Claimant</p>
                    <p className="text-sm font-medium">{claim.claimantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Incident Type
                    </p>
                    <p className="text-sm font-medium">
                      {claim.incidentType.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Claim Amount
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {formatCurrency(claim.claimAmount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Submitted</p>
                    <p className="text-sm font-medium">
                      {formatDate(claim.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Assignment & Priority
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="text-sm font-medium">
                      {claim.assignee?.name ?? (
                        <span className="text-muted-foreground italic">
                          Unassigned
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        PRIORITY_COLORS[claim.priority] ??
                        PRIORITY_COLORS["MEDIUM"]
                      }`}
                    >
                      {claim.priority}
                    </span>
                  </div>
                </div>
                {claim.description && (
                  <div className="flex items-start gap-2.5">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Description
                      </p>
                      <p className="text-sm">{claim.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fraud Score */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <FraudBar score={claim.fraudScore} />
          </div>

          {/* Change Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.value}
                    onClick={() => onStatusChange(claim.id, s.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      claim.status === s.value
                        ? `${s.color} border-current shadow-sm ring-2 ring-current ring-offset-1`
                        : "border-input hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delete Confirmation */}
          {confirmDelete && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 space-y-3">
              <p className="text-sm font-medium text-destructive">
                Are you sure you want to delete this claim? This action cannot
                be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDelete(claim.id);
                    onClose();
                  }}
                >
                  Yes, Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          {!confirmDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConfirmDelete(true)}
            >
              Delete Claim
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(claim)}>Edit Claim</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
