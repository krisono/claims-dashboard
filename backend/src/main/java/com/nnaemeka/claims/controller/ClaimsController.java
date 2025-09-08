package com.nnaemeka.claims.controller;

import com.nnaemeka.claims.dto.ClaimDTO;
import com.nnaemeka.claims.dto.MetricsDTO;
import com.nnaemeka.claims.entity.Pallet;
import com.nnaemeka.claims.repository.PalletRepository;
import com.nnaemeka.claims.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ClaimsController {
    
    @Autowired
    private ClaimService claimService;
    
    @Autowired
    private PalletRepository palletRepository;
    
    @GetMapping("/claims")
    public ResponseEntity<List<ClaimDTO>> getClaims(
            @RequestParam(required = false) String status) {
        List<ClaimDTO> claims = claimService.getClaimsByStatus(status);
        return ResponseEntity.ok(claims);
    }
    
    @PostMapping("/claims")
    public ResponseEntity<ClaimDTO> createClaim(@Valid @RequestBody ClaimDTO claimDTO) {
        try {
            ClaimDTO createdClaim = claimService.createClaim(claimDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdClaim);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/metrics")
    public ResponseEntity<MetricsDTO> getMetrics(
            @RequestParam(defaultValue = "7d") String window) {
        MetricsDTO metrics = claimService.getMetrics(window);
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/pallets/{id}")
    public ResponseEntity<Pallet> getPallet(@PathVariable Long id) {
        Optional<Pallet> pallet = palletRepository.findById(id);
        return pallet.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/pallets")
    public ResponseEntity<List<Pallet>> getAllPallets() {
        List<Pallet> pallets = palletRepository.findAll();
        return ResponseEntity.ok(pallets);
    }
}
