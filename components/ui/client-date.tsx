"use client";

import { useEffect, useState } from "react";

interface ClientDateProps {
  date: string | Date;
  format?: "date" | "datetime" | "time";
}

export function ClientDate({ date, format = "date" }: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    switch (format) {
      case "date":
        setFormattedDate(dateObj.toLocaleDateString());
        break;
      case "datetime":
        setFormattedDate(dateObj.toLocaleString());
        break;
      case "time":
        setFormattedDate(dateObj.toLocaleTimeString());
        break;
    }
  }, [date, format]);

  if (!formattedDate) {
    return <span>-</span>;
  }

  return <span>{formattedDate}</span>;
}
