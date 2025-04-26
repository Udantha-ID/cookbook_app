package com.example.backend.service.impl;

import com.example.backend.dto.MealDTO;
import com.example.backend.entity.Meal;
import com.example.backend.repo.MealRepo;
import com.example.backend.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealServiceIMPL implements MealService {

    @Autowired
    private MealRepo mealRepository;

    @Override
    public Meal saveMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    @Override
    public List<MealDTO> getAllMeals() {
        List<Meal> meals = mealRepository.findAll();

        List<MealDTO> mealDTOs = new ArrayList<>();
        for (Meal meal : meals) {
            MealDTO dto = new MealDTO();
            dto.setId(meal.getId());
            dto.setTitle(meal.getTitle());
            dto.setDescription(meal.getDescription());
            dto.setStartDate(meal.getStartDate());
            dto.setEndDate(meal.getEndDate());
            mealDTOs.add(dto);
        }
        return mealDTOs;
    }

    @Override
    public boolean updateMeal(Long id, Meal updatedMeal) {
        Optional<Meal> mealData = mealRepository.findById(id);

        if(mealData.isPresent()) {
            Meal existingMeal = mealData.get();
            existingMeal.setTitle(updatedMeal.getTitle());
            existingMeal.setDescription(updatedMeal.getDescription());
            existingMeal.setStartDate(updatedMeal.getStartDate());
            existingMeal.setEndDate(updatedMeal.getEndDate());

            mealRepository.save(existingMeal);
            return true;
        }

        return false;
    }

    @Override
    public boolean deleteMeal(Long id) {
        Optional<Meal> meal = mealRepository.findById(id);

        if(meal.isPresent()) {
            mealRepository.deleteById(id);
            return true;
        }

        return false;
    }
}