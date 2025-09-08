package com.nnaemeka.claims.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pallets")
public class Pallet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(name = "asn", nullable = false)
    private String asn; // Advanced Shipping Notice
    
    @NotBlank
    @Column(name = "vendor", nullable = false)
    private String vendor;
    
    @NotBlank
    @Column(name = "trailer_id", nullable = false)
    private String trailerId;
    
    @NotBlank
    @Column(name = "department", nullable = false)
    private String department;
    
    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "pallet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Claim> claims;
    
    // Constructors
    public Pallet() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Pallet(String asn, String vendor, String trailerId, String department) {
        this();
        this.asn = asn;
        this.vendor = vendor;
        this.trailerId = trailerId;
        this.department = department;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getAsn() { return asn; }
    public void setAsn(String asn) { this.asn = asn; }
    
    public String getVendor() { return vendor; }
    public void setVendor(String vendor) { this.vendor = vendor; }
    
    public String getTrailerId() { return trailerId; }
    public void setTrailerId(String trailerId) { this.trailerId = trailerId; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public List<Claim> getClaims() { return claims; }
    public void setClaims(List<Claim> claims) { this.claims = claims; }
}
