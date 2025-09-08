package com.nnaemeka.claims.service;

import com.nnaemeka.claims.dto.ClaimDTO;
import com.nnaemeka.claims.dto.MetricsDTO;
import com.nnaemeka.claims.entity.Claim;
import com.nnaemeka.claims.entity.Pallet;
import com.nnaemeka.claims.repository.ClaimRepository;
import com.nnaemeka.claims.repository.PalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClaimService {
    
    @Autowired
    private ClaimRepository claimRepository;
    
    @Autowired
    private PalletRepository palletRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    public List<ClaimDTO> getClaimsByStatus(String status) {
        List<Claim> claims;
        if (status == null || status.equalsIgnoreCase("all")) {
            claims = claimRepository.findAll();
        } else {
            claims = claimRepository.findByStatus(status.toUpperCase());
        }
        return claims.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public ClaimDTO createClaim(ClaimDTO claimDTO) {
        Optional<Pallet> pallet = palletRepository.findById(claimDTO.getPalletId());
        if (pallet.isEmpty()) {
            throw new RuntimeException("Pallet not found with id: " + claimDTO.getPalletId());
        }
        
        Claim claim = new Claim();
        claim.setPallet(pallet.get());
        claim.setReason(claimDTO.getReason());
        claim.setQtyMissing(claimDTO.getQtyMissing());
        claim.setDollarAmount(claimDTO.getDollarAmount());
        claim.setNotes(claimDTO.getNotes());
        
        Claim savedClaim = claimRepository.save(claim);
        
        // Send WebSocket notification
        ClaimDTO result = convertToDTO(savedClaim);
        messagingTemplate.convertAndSend("/topic/claims", result);
        
        return result;
    }
    
    public MetricsDTO getMetrics(String window) {
        LocalDateTime startDate = calculateStartDate(window);
        
        MetricsDTO metrics = new MetricsDTO();
        
        // KPIs
        MetricsDTO.KPIData kpis = new MetricsDTO.KPIData();
        kpis.setOpenClaims(claimRepository.countOpenClaims());
        kpis.setDollarAtRisk(BigDecimal.valueOf(claimRepository.sumOpenClaimAmounts() != null ? 
                                               claimRepository.sumOpenClaimAmounts() : 0.0));
        
        List<Claim> periodClaims = claimRepository.findByDateRange(startDate, LocalDateTime.now());
        kpis.setTotalClaimsThisPeriod((long) periodClaims.size());
        
        metrics.setKpis(kpis);
        
        // Time series data
        List<Object[]> dailyCounts = claimRepository.findDailyClaimCounts(startDate);
        List<MetricsDTO.TimeSeriesData> timeSeries = dailyCounts.stream()
                .map(row -> new MetricsDTO.TimeSeriesData(row[0].toString(), ((Number) row[1]).longValue()))
                .collect(Collectors.toList());
        metrics.setTimeSeries(timeSeries);
        
        // Top vendors
        List<Object[]> vendorData = claimRepository.findTopVendorsByClaimCount(startDate);
        List<MetricsDTO.VendorMetric> topVendors = vendorData.stream()
                .limit(10)
                .map(row -> new MetricsDTO.VendorMetric((String) row[0], ((Number) row[1]).longValue()))
                .collect(Collectors.toList());
        metrics.setTopVendors(topVendors);
        
        // Top departments
        List<Object[]> deptData = claimRepository.findTopDepartmentsByClaimCount(startDate);
        List<MetricsDTO.DepartmentMetric> topDepartments = deptData.stream()
                .limit(10)
                .map(row -> new MetricsDTO.DepartmentMetric((String) row[0], ((Number) row[1]).longValue()))
                .collect(Collectors.toList());
        metrics.setTopDepartments(topDepartments);
        
        return metrics;
    }
    
    private LocalDateTime calculateStartDate(String window) {
        LocalDateTime now = LocalDateTime.now();
        return switch (window.toLowerCase()) {
            case "7d" -> now.minusDays(7);
            case "30d" -> now.minusDays(30);
            case "90d" -> now.minusDays(90);
            default -> now.minusDays(7);
        };
    }
    
    private ClaimDTO convertToDTO(Claim claim) {
        ClaimDTO dto = new ClaimDTO();
        dto.setId(claim.getId());
        dto.setPalletId(claim.getPallet().getId());
        dto.setAsn(claim.getPallet().getAsn());
        dto.setVendor(claim.getPallet().getVendor());
        dto.setDepartment(claim.getPallet().getDepartment());
        dto.setReason(claim.getReason());
        dto.setQtyMissing(claim.getQtyMissing());
        dto.setDollarAmount(claim.getDollarAmount());
        dto.setStatus(claim.getStatus().name());
        dto.setPriority(claim.getPriority().name());
        dto.setAssignee(claim.getAssignee());
        dto.setNotes(claim.getNotes());
        dto.setCreatedAt(claim.getCreatedAt());
        dto.setResolvedAt(claim.getResolvedAt());
        return dto;
    }
}
