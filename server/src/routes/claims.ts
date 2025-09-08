import { Router } from "express";
import { z } from "zod";

const router = Router();

interface MockClaim {
  id: string;
  palletId: string;
  asn: string;
  vendor: string;
  department: string;
  reason: string;
  qtyMissing: number;
  dollarAmount: number;
  priority: string;
  status: string;
  createdAt: string;
}

const mockClaims: MockClaim[] = [
  {
    id: "1",
    palletId: "PLT-WM-001247",
    asn: "ASN2024091501",
    vendor: "Procter & Gamble Co.",
    department: "Health & Beauty",
    reason: "Temperature damage during transit",
    qtyMissing: 24,
    dollarAmount: 3450.00,
    priority: "CRITICAL",
    status: "OPEN",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    palletId: "PLT-WM-001248",
    asn: "ASN2024091502", 
    vendor: "Samsung Electronics America",
    department: "Electronics",
    reason: "Short shipment - missing cartons",
    qtyMissing: 8,
    dollarAmount: 12890.50,
    priority: "HIGH",
    status: "PENDING",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    palletId: "PLT-WM-001249",
    asn: "ASN2024091503",
    vendor: "Kraft Heinz Company",
    department: "Grocery",
    reason: "Expiration date variance",
    qtyMissing: 15,
    dollarAmount: 892.75,
    priority: "MEDIUM",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    palletId: "PLT-WM-001250",
    asn: "ASN2024091504",
    vendor: "Nike Inc.",
    department: "Apparel",
    reason: "Incorrect size distribution",
    qtyMissing: 32,
    dollarAmount: 4750.25,
    priority: "HIGH",
    status: "OPEN",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    palletId: "PLT-WM-001251",
    asn: "ASN2024091505",
    vendor: "Mattel Inc.",
    department: "Toys",
    reason: "Packaging damage affecting sellability",
    qtyMissing: 18,
    dollarAmount: 2150.00,
    priority: "MEDIUM",
    status: "PENDING",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    palletId: "PLT-WM-001252",
    asn: "ASN2024091506",
    vendor: "Coca-Cola Company",
    department: "Beverages",
    reason: "Product contamination reported",
    qtyMissing: 48,
    dollarAmount: 1680.00,
    priority: "CRITICAL",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    palletId: "PLT-WM-001253",
    asn: "ASN2024091507",
    vendor: "Apple Inc.",
    department: "Electronics",
    reason: "Serial number mismatch",
    qtyMissing: 4,
    dollarAmount: 15200.00,
    priority: "CRITICAL",
    status: "OPEN",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    palletId: "PLT-WM-001254",
    asn: "ASN2024091508",
    vendor: "Johnson & Johnson",
    department: "Pharmacy",
    reason: "Temperature excursion during delivery",
    qtyMissing: 12,
    dollarAmount: 8750.50,
    priority: "CRITICAL",
    status: "PENDING",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "9",
    palletId: "PLT-WM-001255",
    asn: "ASN2024091509",
    vendor: "Tyson Foods Inc.",
    department: "Frozen Foods",
    reason: "Cold chain breach documented",
    qtyMissing: 28,
    dollarAmount: 3420.75,
    priority: "HIGH",
    status: "REJECTED",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "10",
    palletId: "PLT-WM-001256",
    asn: "ASN2024091510",
    vendor: "Unilever North America",
    department: "Personal Care",
    reason: "Incorrect product variant shipped",
    qtyMissing: 36,
    dollarAmount: 2890.25,
    priority: "MEDIUM",
    status: "APPROVED",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "11",
    palletId: "PLT-WM-001257",
    asn: "ASN2024091511",
    vendor: "Microsoft Corporation",
    department: "Electronics",
    reason: "Missing accessories in product bundles",
    qtyMissing: 6,
    dollarAmount: 4750.00,
    priority: "HIGH",
    status: "OPEN",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "12",
    palletId: "PLT-WM-001258",
    asn: "ASN2024091512",
    vendor: "General Mills Inc.",
    department: "Packaged Foods",
    reason: "Quality assurance failure detected",
    qtyMissing: 22,
    dollarAmount: 1450.80,
    priority: "MEDIUM",
    status: "PENDING",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

router.post("/", async (req, res) => {
  try {
    const schema = z.object({
      palletId: z.string().min(1),
      vendor: z.string().min(1),
      department: z.string().min(1),
      reason: z.string().min(1),
      qtyMissing: z.number().nonnegative(),
      dollarAmount: z.number().nonnegative(),
      priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional().default("MEDIUM"),
      status: z.enum(["OPEN", "PENDING", "APPROVED", "REJECTED"]).optional().default("OPEN"),
    });
    const payload = schema.parse(req.body);
    const newClaim: MockClaim = {
      id: String(mockClaims.length + 1),
      asn: `ASN${new Date().getFullYear()}${String(mockClaims.length + 1).padStart(3, '0')}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    mockClaims.unshift(newClaim);
    res.status(201).json(newClaim);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  const { status, type, q } = req.query as Record<string, string | undefined>;
  let filteredClaims = [...mockClaims];
  
  if (status) {
    filteredClaims = filteredClaims.filter(claim => claim.status === status);
  }
  if (type) {
    filteredClaims = filteredClaims.filter(claim => claim.reason.toLowerCase().includes(type.toLowerCase()));
  }
  if (q) {
    const query = q.toLowerCase();
    filteredClaims = filteredClaims.filter(claim => 
      claim.palletId.toLowerCase().includes(query) ||
      claim.vendor.toLowerCase().includes(query) ||
      claim.department.toLowerCase().includes(query) ||
      claim.reason.toLowerCase().includes(query)
    );
  }
  
  res.json(filteredClaims);
});

// New route for metrics that matches the frontend API expectations
router.get("/metrics", async (req, res) => {
  const timeWindow = req.query.timeWindow || "7d";
  const days = timeWindow === "7d" ? 7 : timeWindow === "30d" ? 30 : 90;
  
  // Filter claims within the time window
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const recentClaims = mockClaims.filter(claim => new Date(claim.createdAt) >= cutoffDate);
  
  const total = recentClaims.length;
  const open = recentClaims.filter(c => c.status === "OPEN").length;
  const pending = recentClaims.filter(c => c.status === "PENDING").length;
  const approved = recentClaims.filter(c => c.status === "APPROVED").length;
  const rejected = recentClaims.filter(c => c.status === "REJECTED").length;
  
  // Generate time series data
  const timeSeries = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const count = recentClaims.filter(claim => 
      claim.createdAt.split('T')[0] === dateStr
    ).length;
    timeSeries.push({ date: dateStr, count });
  }
  
  // Top vendors
  const vendorCounts: Record<string, number> = {};
  recentClaims.forEach(claim => {
    vendorCounts[claim.vendor] = (vendorCounts[claim.vendor] || 0) + 1;
  });
  const topVendors = Object.entries(vendorCounts)
    .map(([vendor, claimCount]) => ({ vendor, claimCount: claimCount as number }))
    .sort((a, b) => b.claimCount - a.claimCount)
    .slice(0, 5);
  
  // Top departments
  const departmentCounts: Record<string, number> = {};
  recentClaims.forEach(claim => {
    departmentCounts[claim.department] = (departmentCounts[claim.department] || 0) + 1;
  });
  const topDepartments = Object.entries(departmentCounts)
    .map(([department, claimCount]) => ({ department, claimCount: claimCount as number }))
    .sort((a, b) => b.claimCount - a.claimCount)
    .slice(0, 5);
  
  const totalValue = recentClaims.reduce((sum, claim) => sum + claim.dollarAmount, 0);
  const avgValue = total > 0 ? totalValue / total : 0;
  const avgResolutionTime = 2.4; // days
  const criticalCount = recentClaims.filter(c => c.priority === "CRITICAL").length;
  const resolutionRate = total > 0 ? ((approved + rejected) / total * 100) : 0;
  
  res.json({
    kpis: {
      total,
      open,
      pending,
      approved,
      rejected,
      totalValue,
      avgValue,
      avgResolutionTime,
      criticalCount,
      resolutionRate
    },
    timeSeries,
    topVendors,
    topDepartments
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const schema = z.object({
      status: z.enum(["OPEN", "PENDING", "APPROVED", "REJECTED"]).optional(),
      priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
      dollarAmount: z.number().nonnegative().optional(),
    });
    const payload = schema.parse(req.body);
    const claimIndex = mockClaims.findIndex(c => c.id === req.params.id);
    if (claimIndex === -1) {
      return res.status(404).json({ error: "Claim not found" });
    }
    mockClaims[claimIndex] = { ...mockClaims[claimIndex], ...payload };
    res.json(mockClaims[claimIndex]);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const claimIndex = mockClaims.findIndex(c => c.id === req.params.id);
  if (claimIndex === -1) {
    return res.status(404).json({ error: "Claim not found" });
  }
  mockClaims.splice(claimIndex, 1);
  res.status(204).send();
});

export default router;
