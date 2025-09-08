package com.nnaemeka.claims.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(name = "type", nullable = false)
    private String type;
    
    @Column(name = "payload_json", columnDefinition = "TEXT")
    private String payloadJson;
    
    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "processed")
    private boolean processed = false;
    
    // Constructors
    public Event() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Event(String type, String payloadJson) {
        this();
        this.type = type;
        this.payloadJson = payloadJson;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getPayloadJson() { return payloadJson; }
    public void setPayloadJson(String payloadJson) { this.payloadJson = payloadJson; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public boolean isProcessed() { return processed; }
    public void setProcessed(boolean processed) { this.processed = processed; }
}
