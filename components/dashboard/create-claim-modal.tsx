"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ClaimFormData {
  claimantName: string;
  title: string;
  incidentType: string;
  claimAmount: string;
  priority: string;
  assignee: string;
  description: string;
}

interface CreateClaimModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ClaimFormData) => void;
  initialData?: Partial<ClaimFormData>;
  mode?: "create" | "edit";
}

const INCIDENT_TYPES = [
  { value: "AUTO_ACCIDENT", label: "Auto Accident" },
  { value: "PROPERTY_DAMAGE", label: "Property Damage" },
  { value: "MEDICAL", label: "Medical" },
  { value: "THEFT", label: "Theft" },
  { value: "FIRE", label: "Fire Damage" },
  { value: "WATER_DAMAGE", label: "Water Damage" },
  { value: "INJURY", label: "Injury" },
  { value: "WEATHER", label: "Weather Damage" },
  { value: "LIABILITY", label: "Liability" },
  { value: "OTHER", label: "Other" },
];

const PRIORITIES = [
  { value: "LOW", label: "Low", color: "bg-gray-100 text-gray-700" },
  { value: "MEDIUM", label: "Medium", color: "bg-blue-100 text-blue-700" },
  { value: "HIGH", label: "High", color: "bg-orange-100 text-orange-700" },
  { value: "CRITICAL", label: "Critical", color: "bg-red-100 text-red-700" },
];

const ASSIGNEES = [
  "John Smith",
  "Jane Doe",
  "Bob Wilson",
  "Alice Brown",
  "Sarah Lee",
  "Mike Johnson",
  "Emma Davis",
  "Tom Harris",
  "Lisa Chen",
  "Chris Martinez",
];

const emptyForm: ClaimFormData = {
  claimantName: "",
  title: "",
  incidentType: "",
  claimAmount: "",
  priority: "MEDIUM",
  assignee: "",
  description: "",
};

type Errors = Partial<Record<keyof ClaimFormData, string>>;

export function CreateClaimModal({
  open,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}: CreateClaimModalProps) {
  const [form, setForm] = useState<ClaimFormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
      setErrors({});
    }
  }, [open, initialData]);

  const setField = (key: keyof ClaimFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.claimantName.trim()) newErrors.claimantName = "Claimant name is required";
    if (!form.title.trim()) newErrors.title = "Claim title is required";
    if (!form.incidentType) newErrors.incidentType = "Incident type is required";
    if (!form.claimAmount || isNaN(Number(form.claimAmount)) || Number(form.claimAmount) <= 0) {
      newErrors.claimAmount = "Valid claim amount is required";
    }
    if (!form.priority) newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit(form);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Claim" : "Edit Claim"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details below to submit a new insurance claim."
              : "Update the claim information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="grid gap-5">
            {/* Row 1: Claimant Name + Claim Title */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Claimant Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.claimantName}
                  onChange={(e) => setField("claimantName", e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className={cn(
                    "w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                    errors.claimantName && "border-destructive focus:ring-destructive/50"
                  )}
                />
                {errors.claimantName && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.claimantName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  Claim Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="e.g. Auto Accident on Highway 101"
                  className={cn(
                    "w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                    errors.title && "border-destructive focus:ring-destructive/50"
                  )}
                />
                {errors.title && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.title}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Incident Type + Claim Amount */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Incident Type <span className="text-destructive">*</span>
                </label>
                <select
                  value={form.incidentType}
                  onChange={(e) => setField("incidentType", e.target.value)}
                  className={cn(
                    "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                    errors.incidentType && "border-destructive focus:ring-destructive/50"
                  )}
                >
                  <option value="">Select incident type...</option>
                  {INCIDENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                {errors.incidentType && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.incidentType}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  Claim Amount (USD) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <input
                    type="number"
                    value={form.claimAmount}
                    onChange={(e) => setField("claimAmount", e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={cn(
                      "w-full rounded-md border bg-background pl-7 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                      errors.claimAmount && "border-destructive focus:ring-destructive/50"
                    )}
                  />
                </div>
                {errors.claimAmount && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.claimAmount}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Priority + Assignee */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Priority <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setField("priority", p.value)}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium border transition-all",
                        form.priority === p.value
                          ? `${p.color} border-current shadow-sm`
                          : "border-input hover:bg-accent"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Assignee</label>
                <select
                  value={form.assignee}
                  onChange={(e) => setField("assignee", e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                >
                  <option value="">Unassigned</option>
                  {ASSIGNEES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Describe the incident and any relevant details..."
                rows={3}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "create" ? "Creating..." : "Saving..."}
                </span>
              ) : mode === "create" ? (
                "Create Claim"
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
