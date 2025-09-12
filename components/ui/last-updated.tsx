"use client";

import { useEffect, useState } from "react";

export function LastUpdated() {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    // Set initial timestamp
    setTimestamp(new Date().toLocaleString());

    // Update every minute
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleString());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!timestamp) {
    return <span>Loading...</span>;
  }

  return <span>Last updated: {timestamp}</span>;
}
