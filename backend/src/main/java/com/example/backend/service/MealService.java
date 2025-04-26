package com.example.backend.service;

import com.example.backend.dto.MealDTO;
import com.example.backend.entity.Meal;

import java.util.List;

public interface MealService {
    Meal saveMeal(Meal meal);

    List<MealDTO> getAllMeals();

    boolean updateMeal(Long id, Meal updatedMeal);

    boolean deleteMeal(Long id);
}
