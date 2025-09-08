package com.nnaemeka.claims.repository;

import com.nnaemeka.claims.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByProcessedFalse();
    List<Event> findByType(String type);
}
