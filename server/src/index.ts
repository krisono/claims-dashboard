import "dotenv/config";
import express from "express";
import cors from "cors";
// import { connectDB } from "./db.js";
import claimsRouter from "./routes/claims.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(",") || "*" }));

app.get("/", (_req, res) => {
  res.json({ 
    message: "Claims Dashboard API",
    version: "1.0.0",
    endpoints: {
      ping: "/api/ping",
      claims: "/api/claims",
      metrics: "/api/claims/metrics"
    }
  });
});
app.get("/api/ping", (_req, res) => res.json({ ok: true }));
app.use("/api/claims", claimsRouter);

const PORT = Number(process.env.PORT || 4000);

// Skip MongoDB connection for now - using mock data
app.listen(PORT, () => {
  console.log(`🚀 API on http://localhost:${PORT}`);
});
