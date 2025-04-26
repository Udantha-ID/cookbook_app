package com.example.backend.repo;

import com.example.backend.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepo extends JpaRepository<Meal, Long> {
}
