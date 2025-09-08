import { motion } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";

export default function DashboardSimple() {
  const connected = false;

  const handleRefresh = () => {
    console.log("Refresh clicked");
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

        {/* Simple content for now */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Dashboard Content</h2>
          <p>The dashboard is loading components...</p>
        </div>
      </main>
    </div>
  );
}
