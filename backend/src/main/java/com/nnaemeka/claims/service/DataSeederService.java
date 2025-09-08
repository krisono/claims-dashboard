package com.nnaemeka.claims.service;

import com.nnaemeka.claims.entity.Pallet;
import com.nnaemeka.claims.entity.Claim;
import com.nnaemeka.claims.entity.ClaimPriority;
import com.nnaemeka.claims.repository.PalletRepository;
import com.nnaemeka.claims.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class DataSeederService implements CommandLineRunner {
    
    @Autowired
    private PalletRepository palletRepository;
    
    @Autowired
    private ClaimRepository claimRepository;
    
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
    
    @Override
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (palletRepository.count() == 0) {
            seedInitialData();
        }
    }
    
    private void seedInitialData() {
        System.out.println("Seeding initial data...");
        
        // Create 50 pallets
        for (int i = 0; i < 50; i++) {
            Pallet pallet = createRandomPallet();
            pallet = palletRepository.save(pallet);
            
            // 30% chance to create a claim for this pallet
            if (random.nextDouble() < 0.3) {
                createRandomClaim(pallet);
            }
        }
        
        System.out.println("Initial data seeding completed!");
    }
    
    private Pallet createRandomPallet() {
        String vendor = vendors.get(random.nextInt(vendors.size()));
        String department = departments.get(random.nextInt(departments.size()));
        String asn = "ASN" + (100000 + random.nextInt(900000));
        String trailerId = "TRL" + (1000 + random.nextInt(9000));
        
        Pallet pallet = new Pallet(asn, vendor, trailerId, department);
        
        // Set random creation time within the last 30 days
        LocalDateTime randomTime = LocalDateTime.now().minusDays(random.nextInt(30))
                .minusHours(random.nextInt(24))
                .minusMinutes(random.nextInt(60));
        pallet.setCreatedAt(randomTime);
        
        return pallet;
    }
    
    private void createRandomClaim(Pallet pallet) {
        Claim claim = new Claim();
        claim.setPallet(pallet);
        claim.setReason(claimReasons.get(random.nextInt(claimReasons.size())));
        claim.setQtyMissing(1 + random.nextInt(50));
        claim.setDollarAmount(BigDecimal.valueOf(50 + random.nextDouble() * 5000));
        
        // Set priority based on dollar amount
        if (claim.getDollarAmount().compareTo(BigDecimal.valueOf(2000)) > 0) {
            claim.setPriority(ClaimPriority.HIGH);
        } else if (claim.getDollarAmount().compareTo(BigDecimal.valueOf(1000)) > 0) {
            claim.setPriority(ClaimPriority.MEDIUM);
        } else {
            claim.setPriority(ClaimPriority.LOW);
        }
        
        // Set random creation time after pallet creation
        LocalDateTime claimTime = pallet.getCreatedAt().plusHours(random.nextInt(48));
        claim.setCreatedAt(claimTime);
        
        claimRepository.save(claim);
    }
}
