package com.nnaemeka.claims.dto;

import java.math.BigDecimal;
import java.util.List;

public class MetricsDTO {
    private KPIData kpis;
    private List<TimeSeriesData> timeSeries;
    private List<VendorMetric> topVendors;
    private List<DepartmentMetric> topDepartments;
    
    // Inner classes
    public static class KPIData {
        private Long openClaims;
        private BigDecimal dollarAtRisk;
        private Double averageResolutionTime;
        private Long totalClaimsThisPeriod;
        
        // Getters and Setters
        public Long getOpenClaims() { return openClaims; }
        public void setOpenClaims(Long openClaims) { this.openClaims = openClaims; }
        
        public BigDecimal getDollarAtRisk() { return dollarAtRisk; }
        public void setDollarAtRisk(BigDecimal dollarAtRisk) { this.dollarAtRisk = dollarAtRisk; }
        
        public Double getAverageResolutionTime() { return averageResolutionTime; }
        public void setAverageResolutionTime(Double averageResolutionTime) { this.averageResolutionTime = averageResolutionTime; }
        
        public Long getTotalClaimsThisPeriod() { return totalClaimsThisPeriod; }
        public void setTotalClaimsThisPeriod(Long totalClaimsThisPeriod) { this.totalClaimsThisPeriod = totalClaimsThisPeriod; }
    }
    
    public static class TimeSeriesData {
        private String date;
        private Long count;
        
        public TimeSeriesData(String date, Long count) {
            this.date = date;
            this.count = count;
        }
        
        // Getters and Setters
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        
        public Long getCount() { return count; }
        public void setCount(Long count) { this.count = count; }
    }
    
    public static class VendorMetric {
        private String vendor;
        private Long claimCount;
        
        public VendorMetric(String vendor, Long claimCount) {
            this.vendor = vendor;
            this.claimCount = claimCount;
        }
        
        // Getters and Setters
        public String getVendor() { return vendor; }
        public void setVendor(String vendor) { this.vendor = vendor; }
        
        public Long getClaimCount() { return claimCount; }
        public void setClaimCount(Long claimCount) { this.claimCount = claimCount; }
    }
    
    public static class DepartmentMetric {
        private String department;
        private Long claimCount;
        
        public DepartmentMetric(String department, Long claimCount) {
            this.department = department;
            this.claimCount = claimCount;
        }
        
        // Getters and Setters
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        
        public Long getClaimCount() { return claimCount; }
        public void setClaimCount(Long claimCount) { this.claimCount = claimCount; }
    }
    
    // Main class Getters and Setters
    public KPIData getKpis() { return kpis; }
    public void setKpis(KPIData kpis) { this.kpis = kpis; }
    
    public List<TimeSeriesData> getTimeSeries() { return timeSeries; }
    public void setTimeSeries(List<TimeSeriesData> timeSeries) { this.timeSeries = timeSeries; }
    
    public List<VendorMetric> getTopVendors() { return topVendors; }
    public void setTopVendors(List<VendorMetric> topVendors) { this.topVendors = topVendors; }
    
    public List<DepartmentMetric> getTopDepartments() { return topDepartments; }
    public void setTopDepartments(List<DepartmentMetric> topDepartments) { this.topDepartments = topDepartments; }
}
