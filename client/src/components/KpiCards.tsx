import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Clock,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { KPIData } from "../lib/api";

interface KpiCardsProps {
  data: KPIData | null;
}

export default function KpiCards({ data }: KpiCardsProps) {
  if (!data) {
    return (
      <div className="kpi-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="kpi-card">
            <div className="loading">
              <div className="spinner"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: "Total Claims",
      value: data.total?.toLocaleString() || "0",
      icon: AlertTriangle,
      iconClass: "blue",
      trend: { value: `${data.open} open`, type: "neutral" },
      description: "active claims",
    },
    {
      title: "Total Value at Risk",
      value: `$${(data.totalValue || 0).toLocaleString()}`,
      icon: DollarSign,
      iconClass: "yellow",
      trend: {
        value: `$${(data.avgValue || 0).toLocaleString()} avg`,
        type: "neutral",
      },
      description: "average per claim",
    },
    {
      title: "Critical Priority",
      value: data.criticalCount?.toLocaleString() || "0",
      icon: AlertTriangle,
      iconClass: "red",
      trend: {
        value: `${data.criticalCount || 0}/${data.total || 0}`,
        type: "negative",
      },
      description: "require immediate attention",
    },
    {
      title: "Resolution Rate",
      value: `${(data.resolutionRate || 0).toFixed(1)}%`,
      icon: TrendingUp,
      iconClass: "green",
      trend: {
        value: `${data.avgResolutionTime || 0} days avg`,
        type: "positive",
      },
      description: "claims resolved successfully",
    },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="kpi-card"
        >
          <div className="kpi-header">
            <div className="flex flex-col">
              <p className="kpi-label">{kpi.title}</p>
              <h3 className="kpi-value">{kpi.value}</h3>
            </div>
            <div className={`kpi-icon ${kpi.iconClass}`}>
              <kpi.icon size={24} />
            </div>
          </div>

          <div className={`kpi-change ${kpi.trend.type}`}>
            {kpi.trend.type === "positive" ? (
              <ArrowUpIcon size={16} />
            ) : (
              <ArrowDownIcon size={16} />
            )}
            <span>
              {kpi.trend.value} {kpi.description}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
