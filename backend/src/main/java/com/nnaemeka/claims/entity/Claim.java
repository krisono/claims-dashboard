package com.nnaemeka.claims.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pallet_id", nullable = false)
    private Pallet pallet;
    
    @NotBlank
    @Column(name = "reason", nullable = false)
    private String reason;
    
    @NotNull
    @PositiveOrZero
    @Column(name = "qty_missing", nullable = false)
    private Integer qtyMissing;
    
    @Column(name = "dollar_amount", precision = 10, scale = 2)
    private BigDecimal dollarAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ClaimStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private ClaimPriority priority;
    
    @Column(name = "assignee")
    private String assignee;
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
    
    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
    
    // Constructors
    public Claim() {
        this.createdAt = LocalDateTime.now();
        this.status = ClaimStatus.OPEN;
        this.priority = ClaimPriority.MEDIUM;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Pallet getPallet() { return pallet; }
    public void setPallet(Pallet pallet) { this.pallet = pallet; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public Integer getQtyMissing() { return qtyMissing; }
    public void setQtyMissing(Integer qtyMissing) { this.qtyMissing = qtyMissing; }
    
    public BigDecimal getDollarAmount() { return dollarAmount; }
    public void setDollarAmount(BigDecimal dollarAmount) { this.dollarAmount = dollarAmount; }
    
    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { 
        this.status = status;
        if (status == ClaimStatus.RESOLVED && resolvedAt == null) {
            this.resolvedAt = LocalDateTime.now();
        }
    }
    
    public ClaimPriority getPriority() { return priority; }
    public void setPriority(ClaimPriority priority) { this.priority = priority; }
    
    public String getAssignee() { return assignee; }
    public void setAssignee(String assignee) { this.assignee = assignee; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
