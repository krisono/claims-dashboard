package com.nnaemeka.claims.repository;

import com.nnaemeka.claims.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    
    List<Claim> findByStatus(String status);
    
    @Query("SELECT c FROM Claim c WHERE c.createdAt >= :startDate AND c.createdAt <= :endDate")
    List<Claim> findByDateRange(@Param("startDate") LocalDateTime startDate, 
                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT c FROM Claim c WHERE c.pallet.department = :department")
    List<Claim> findByDepartment(@Param("department") String department);
    
    @Query("SELECT c FROM Claim c WHERE c.pallet.vendor = :vendor")
    List<Claim> findByVendor(@Param("vendor") String vendor);
    
    @Query("SELECT COUNT(c) FROM Claim c WHERE c.status = 'OPEN'")
    Long countOpenClaims();
    
    @Query("SELECT SUM(c.dollarAmount) FROM Claim c WHERE c.status = 'OPEN'")
    Double sumOpenClaimAmounts();
    
    @Query("SELECT c.pallet.vendor, COUNT(c) as claimCount FROM Claim c " +
           "WHERE c.createdAt >= :startDate " +
           "GROUP BY c.pallet.vendor " +
           "ORDER BY claimCount DESC")
    List<Object[]> findTopVendorsByClaimCount(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT c.pallet.department, COUNT(c) as claimCount FROM Claim c " +
           "WHERE c.createdAt >= :startDate " +
           "GROUP BY c.pallet.department " +
           "ORDER BY claimCount DESC")
    List<Object[]> findTopDepartmentsByClaimCount(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT DATE(c.createdAt), COUNT(c) FROM Claim c " +
           "WHERE c.createdAt >= :startDate " +
           "GROUP BY DATE(c.createdAt) " +
           "ORDER BY DATE(c.createdAt)")
    List<Object[]> findDailyClaimCounts(@Param("startDate") LocalDateTime startDate);
}
