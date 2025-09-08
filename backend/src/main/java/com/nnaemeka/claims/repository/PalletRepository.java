package com.nnaemeka.claims.repository;

import com.nnaemeka.claims.entity.Pallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PalletRepository extends JpaRepository<Pallet, Long> {
    
    List<Pallet> findByVendor(String vendor);
    List<Pallet> findByDepartment(String department);
    List<Pallet> findByAsn(String asn);
}
