package com.example.backend.repo;

import com.example.backend.entity.Technique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechniqueRepo extends JpaRepository<Technique, Long> {
}
