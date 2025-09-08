import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";

export default function Filters({
  onChange,
}: {
  onChange: (q: Record<string, string>) => void;
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const params: Record<string, string> = {};
    if (q) params.q = q;
    if (status) params.status = status;
    if (type) params.type = type;
    onChange(params);
  }, [q, status, type]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Filter size={20} />
          Filter Claims
        </h3>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search claims..."
              className="input pl-10"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input min-w-36"
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input min-w-36"
          >
            <option value="">All Types</option>
            <option value="SHORTAGE">Shortage</option>
            <option value="DAMAGE">Damage</option>
            <option value="RETURN">Return</option>
            <option value="OTHER">Other</option>
          </select>

          {(q || status || type) && (
            <button
              onClick={() => {
                setQ("");
                setStatus("");
                setType("");
              }}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
