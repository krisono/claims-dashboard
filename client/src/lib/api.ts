// lib/api.ts - Enhanced API service
const BASE_URL = 'http://localhost:4000/api';

export interface Claim {
  id: number;
  palletId: number;
  asn: string;
  vendor: string;
  department: string;
  reason: string;
  qtyMissing: number;
  dollarAmount: number;
  status: 'OPEN' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assignee?: string;
  notes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Pallet {
  id: number;
  asn: string;
  vendor: string;
  trailerId: string;
  department: string;
  createdAt: string;
}

export interface KPIData {
  total: number;
  open: number;
  pending: number;
  approved: number;
  rejected: number;
  totalValue: number;
  avgValue: number;
  avgResolutionTime: number;
  criticalCount: number;
  resolutionRate: number;
  openClaims?: number;
  dollarAtRisk?: number;
  averageResolutionTime?: number;
  totalClaimsThisPeriod?: number;
}

export interface TimeSeriesData {
  date: string;
  count: number;
}

export interface VendorMetric {
  vendor: string;
  claimCount: number;
}

export interface DepartmentMetric {
  department: string;
  claimCount: number;
}

export interface MetricsResponse {
  kpis: KPIData;
  timeSeries: TimeSeriesData[];
  topVendors: VendorMetric[];
  topDepartments: DepartmentMetric[];
}

export const api = {
  // Claims
  getClaims: async (status?: string): Promise<Claim[]> => {
    const url = status ? `${BASE_URL}/claims?status=${status}` : `${BASE_URL}/claims`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch claims');
    return response.json();
  },

  createClaim: async (claim: Partial<Claim>): Promise<Claim> => {
    const response = await fetch(`${BASE_URL}/claims`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claim),
    });
    if (!response.ok) throw new Error('Failed to create claim');
    return response.json();
  },

  // Metrics
  getMetrics: async (window: string = '7d'): Promise<MetricsResponse> => {
    const response = await fetch(`${BASE_URL}/metrics?window=${window}`);
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return response.json();
  },

  // Pallets
  getPallet: async (id: number): Promise<Pallet> => {
    const response = await fetch(`${BASE_URL}/pallets/${id}`);
    if (!response.ok) throw new Error('Failed to fetch pallet');
    return response.json();
  },

  getPallets: async (): Promise<Pallet[]> => {
    const response = await fetch(`${BASE_URL}/pallets`);
    if (!response.ok) throw new Error('Failed to fetch pallets');
    return response.json();
  },
};

// Legacy functions for backward compatibility
export async function getKpis() {
  const metrics = await api.getMetrics();
  return metrics.kpis;
}

export async function getClaims(params: Record<string, string> = {}) {
  const status = params.status;
  return api.getClaims(status);
}

export async function updateClaim(id: string, patch: any) {
  // This would need to be implemented in the Java backend
  const response = await fetch(`${BASE_URL}/claims/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  return response.json();
}
