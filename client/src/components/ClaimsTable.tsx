import { motion } from "framer-motion";
import { ExternalLink, Edit, Eye, Package, Building2 } from "lucide-react";
import StatusPill from "./StatusPill";
import { Claim } from "../lib/api";

interface ClaimsTableProps {
  items: Claim[];
  onUpdate?: (id: string, patch: any) => void;
}

export default function ClaimsTable({ items, onUpdate }: ClaimsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityPillClass = (priority: string) => {
    return `priority-pill ${priority.toLowerCase()}`;
  };

  return (
    <div className="table-container">
      <div className="card-header">
        <h3 className="card-title">
          <Package size={20} />
          Recent Claims
        </h3>
        <p className="text-sm text-gray-600">
          Latest {items.length} claims in the system
        </p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Pallet/ASN</th>
            <th>Vendor</th>
            <th>Department</th>
            <th>Reason</th>
            <th>Amount</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((claim, index) => (
            <motion.tr
              key={claim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td>
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      #{claim.palletId}
                    </div>
                    <div className="text-sm text-gray-500">{claim.asn}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="font-medium">{claim.vendor}</span>
                </div>
              </td>
              <td>
                <span className="status-pill approved">{claim.department}</span>
              </td>
              <td>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    {claim.reason}
                  </div>
                  <div className="text-sm text-gray-500">
                    {claim.qtyMissing} units missing
                  </div>
                </div>
              </td>
              <td>
                <div className="font-semibold text-lg">
                  {formatCurrency(claim.dollarAmount)}
                </div>
              </td>
              <td>
                <span className={getPriorityPillClass(claim.priority)}>
                  {claim.priority}
                </span>
              </td>
              <td>
                <StatusPill status={claim.status} />
              </td>
              <td>
                <div className="text-sm text-gray-600">
                  {formatDate(claim.createdAt)}
                </div>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-secondary p-2"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button className="btn btn-primary p-2" title="Edit Claim">
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-secondary p-2"
                    title="External Link"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Package size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No claims found</p>
          <p className="text-sm">Claims will appear here as they are created</p>
        </div>
      )}
    </div>
  );
}
