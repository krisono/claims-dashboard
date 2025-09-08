import { connectDB } from "./db.js";
import { Claim } from "./models/Claim.js";

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/claims_dev";

async function run() {
  await connectDB(MONGO);
  await Claim.deleteMany({});
  await Claim.insertMany([
    { storeId: "1001", department: "Grocery", type: "SHORTAGE", amount: 120.5, status: "OPEN", priority: "HIGH", assignee: "Alex" },
    { storeId: "1001", department: "Electronics", type: "DAMAGE", amount: 89.99, status: "PENDING", priority: "MEDIUM", assignee: "Sam" },
    { storeId: "1002", department: "Apparel", type: "RETURN", amount: 45.0, status: "APPROVED", priority: "LOW" },
    { storeId: "1003", department: "Grocery", type: "OTHER", amount: 15.0, status: "REJECTED" },
  ]);
  process.exit(0);
}
run();
