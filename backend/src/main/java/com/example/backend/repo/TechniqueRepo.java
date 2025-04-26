package com.example.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Technique;

public interface TechniqueRepo extends JpaRepository<Technique, Long> {

}
