package com.nnaemeka.claims.service;

import com.nnaemeka.claims.entity.Event;
import com.nnaemeka.claims.entity.Pallet;
import com.nnaemeka.claims.entity.Claim;
import com.nnaemeka.claims.entity.ClaimPriority;
import com.nnaemeka.claims.repository.EventRepository;
import com.nnaemeka.claims.repository.PalletRepository;
import com.nnaemeka.claims.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.util.Random;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class EventSimulatorService {
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private PalletRepository palletRepository;
    
    @Autowired
    private ClaimRepository claimRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Random random = new Random();
    
    private final List<String> vendors = Arrays.asList(
        "Coca-Cola", "Pepsi", "Nestlé", "Kraft Heinz", "Unilever",
        "General Mills", "Kellogg's", "ConAgra", "Tyson Foods", "Hormel"
    );
    
    private final List<String> departments = Arrays.asList(
        "Grocery", "Electronics", "Clothing", "Home & Garden", "Pharmacy",
        "Automotive", "Sports", "Toys", "Pet Supplies", "Health & Beauty"
    );
    
    private final List<String> claimReasons = Arrays.asList(
        "Missing units", "Damaged in transit", "Wrong product delivered",
        "Expired products", "Quality defect", "Incomplete shipment",
        "Mislabeled items", "Temperature damage", "Water damage", "Theft"
    );
    
    // Simulate pallet arrivals every 30 seconds
    @Scheduled(fixedRate = 30000)
    public void simulatePalletArrival() {
        try {
            String vendor = vendors.get(random.nextInt(vendors.size()));
            String department = departments.get(random.nextInt(departments.size()));
            String asn = "ASN" + System.currentTimeMillis();
            String trailerId = "TRL" + (1000 + random.nextInt(9000));
            
            Pallet pallet = new Pallet(asn, vendor, trailerId, department);
            pallet = palletRepository.save(pallet);
            
            // Create pallet arrival event
            Map<String, Object> eventPayload = new HashMap<>();
            eventPayload.put("palletId", pallet.getId());
            eventPayload.put("asn", asn);
            eventPayload.put("vendor", vendor);
            eventPayload.put("department", department);
            eventPayload.put("trailerId", trailerId);
            
            Event event = new Event("PALLET_ARRIVAL", objectMapper.writeValueAsString(eventPayload));
            eventRepository.save(event);
            
            // Send WebSocket notification
            messagingTemplate.convertAndSend("/topic/pallets", pallet);
            
            // Sometimes generate a claim (20% chance)
            if (random.nextDouble() < 0.2) {
                generateRandomClaim(pallet);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    // Simulate shortage/damage events every 45 seconds
    @Scheduled(fixedRate = 45000)
    public void simulateClaimEvent() {
        try {
            List<Pallet> pallets = palletRepository.findAll();
            if (!pallets.isEmpty()) {
                Pallet pallet = pallets.get(random.nextInt(pallets.size()));
                generateRandomClaim(pallet);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    // Process unprocessed events every 10 seconds
    @Scheduled(fixedRate = 10000)
    public void processEvents() {
        List<Event> unprocessedEvents = eventRepository.findByProcessedFalse();
        for (Event event : unprocessedEvents) {
            try {
                processEvent(event);
                event.setProcessed(true);
                eventRepository.save(event);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    
    private void generateRandomClaim(Pallet pallet) {
        try {
            Claim claim = new Claim();
            claim.setPallet(pallet);
            claim.setReason(claimReasons.get(random.nextInt(claimReasons.size())));
            claim.setQtyMissing(1 + random.nextInt(50));
            claim.setDollarAmount(BigDecimal.valueOf(50 + random.nextDouble() * 5000));
            
            // Set priority based on dollar amount
            if (claim.getDollarAmount().compareTo(BigDecimal.valueOf(1000)) > 0) {
                claim.setPriority(ClaimPriority.HIGH);
            } else if (claim.getDollarAmount().compareTo(BigDecimal.valueOf(500)) > 0) {
                claim.setPriority(ClaimPriority.MEDIUM);
            } else {
                claim.setPriority(ClaimPriority.LOW);
            }
            
            claim = claimRepository.save(claim);
            
            // Create claim event
            Map<String, Object> eventPayload = new HashMap<>();
            eventPayload.put("claimId", claim.getId());
            eventPayload.put("palletId", pallet.getId());
            eventPayload.put("reason", claim.getReason());
            eventPayload.put("qtyMissing", claim.getQtyMissing());
            eventPayload.put("dollarAmount", claim.getDollarAmount());
            
            Event event = new Event("CLAIM_CREATED", objectMapper.writeValueAsString(eventPayload));
            eventRepository.save(event);
            
            // Send WebSocket notification
            messagingTemplate.convertAndSend("/topic/claims", convertClaimToNotification(claim));
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private void processEvent(Event event) {
        // Here you could add custom event processing logic
        // For now, we'll just mark events as processed
        System.out.println("Processing event: " + event.getType() + " - " + event.getPayloadJson());
    }
    
    private Map<String, Object> convertClaimToNotification(Claim claim) {
        Map<String, Object> notification = new HashMap<>();
        notification.put("id", claim.getId());
        notification.put("palletId", claim.getPallet().getId());
        notification.put("vendor", claim.getPallet().getVendor());
        notification.put("department", claim.getPallet().getDepartment());
        notification.put("reason", claim.getReason());
        notification.put("qtyMissing", claim.getQtyMissing());
        notification.put("dollarAmount", claim.getDollarAmount());
        notification.put("status", claim.getStatus().name());
        notification.put("priority", claim.getPriority().name());
        notification.put("createdAt", claim.getCreatedAt());
        return notification;
    }
}
