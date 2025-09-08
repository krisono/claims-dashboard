import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import KpiCards from "../components/KpiCards";
import ClaimsTable from "../components/ClaimsTable";
import Filters from "../components/Filters";
import { ChartsSection } from "../components/ChartsSection";
import { api, Claim, MetricsResponse } from "../lib/api";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [query, setQuery] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("7d");
  const connected = false;

  const loadMetrics = useCallback(async () => {
    try {
      const metricsData = await api.getMetrics(timeWindow);
      setMetrics(metricsData);
    } catch (error) {
      setMetrics(null);
    }
  }, [timeWindow]);

  const loadClaims = useCallback(async () => {
    try {
      setLoading(true);
      const claimsData = await api.getClaims(query.status);
      setClaims(claimsData.slice(0, 25));
    } catch (error) {
      setClaims([]);
    } finally {
      setLoading(false);
    }
  }, [query.status]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  const handleRefresh = () => {
    loadMetrics();
    loadClaims();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        {/* Header with connection status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Claims Dashboard
            </h1>
            <p className="text-muted">
              Real-time supply chain monitoring and claims management
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-card border">
              {connected ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  connected ? "text-green-600" : "text-red-600"
                }`}
              >
                {connected ? "Live Updates" : "Disconnected"}
              </span>
            </div>

            <button onClick={handleRefresh} className="btn btn-primary">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Time Window Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-foreground">Time Period</h3>
            </div>
            <div className="flex space-x-2">
              {["7d", "30d", "90d"].map((window) => (
                <button
                  key={window}
                  onClick={() => setTimeWindow(window)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeWindow === window
                      ? "bg-primary text-white shadow-sm"
                      : "bg-surface text-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  {window === "7d"
                    ? "7 Days"
                    : window === "30d"
                    ? "30 Days"
                    : "90 Days"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <KpiCards data={metrics?.kpis || null} />

        {/* Charts Section */}
        {metrics && (
          <ChartsSection
            timeSeries={metrics.timeSeries}
            topVendors={metrics.topVendors}
            topDepartments={metrics.topDepartments}
          />
        )}

        {/* Filters */}
        <div className="mb-8">
          <Filters onChange={setQuery} />
        </div>

        {/* Claims Table */}
        {loading ? (
          <div className="card">
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-primary mr-3" />
              <span className="text-muted text-lg">Loading claims...</span>
            </div>
          </div>
        ) : (
          <ClaimsTable items={claims} />
        )}
      </main>
    </div>
  );
}
