import { Schema, model } from "mongoose";

export type ClaimStatus = "OPEN" | "PENDING" | "APPROVED" | "REJECTED";
export type ClaimType = "SHORTAGE" | "DAMAGE" | "RETURN" | "OTHER";

const ClaimSchema = new Schema(
  {
    storeId: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, enum: ["SHORTAGE", "DAMAGE", "RETURN", "OTHER"], required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["OPEN", "PENDING", "APPROVED", "REJECTED"], default: "OPEN" },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
    assignee: { type: String, default: null },
    notes: { type: String, default: "" },
    evidenceUrls: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Claim = model("Claim", ClaimSchema);
