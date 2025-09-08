package com.nnaemeka.claims.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ClaimDTO {
    private Long id;
    private Long palletId;
    private String asn;
    private String vendor;
    private String department;
    private String reason;
    private Integer qtyMissing;
    private BigDecimal dollarAmount;
    private String status;
    private String priority;
    private String assignee;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    
    // Constructors
    public ClaimDTO() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getPalletId() { return palletId; }
    public void setPalletId(Long palletId) { this.palletId = palletId; }
    
    public String getAsn() { return asn; }
    public void setAsn(String asn) { this.asn = asn; }
    
    public String getVendor() { return vendor; }
    public void setVendor(String vendor) { this.vendor = vendor; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public Integer getQtyMissing() { return qtyMissing; }
    public void setQtyMissing(Integer qtyMissing) { this.qtyMissing = qtyMissing; }
    
    public BigDecimal getDollarAmount() { return dollarAmount; }
    public void setDollarAmount(BigDecimal dollarAmount) { this.dollarAmount = dollarAmount; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getAssignee() { return assignee; }
    public void setAssignee(String assignee) { this.assignee = assignee; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
