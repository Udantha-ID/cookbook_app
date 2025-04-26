package com.example.backend.controller;

import com.example.backend.dto.MealDTO;
import com.example.backend.entity.Meal;
import com.example.backend.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/meal")
@CrossOrigin
public class MealController {

    @Autowired
    private MealService mealService;

    @PostMapping("/save")
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) {
        try {
            Meal savedMeal = mealService.saveMeal(meal);
            return new ResponseEntity<>(savedMeal, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<MealDTO>> getAllMeals() {
        try {
            List<MealDTO> meals = mealService.getAllMeals();

            if (meals.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(meals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateMeal(@PathVariable("id") Long id, @RequestBody Meal meal) {
        try {
            boolean updated = mealService.updateMeal(id, meal);

            if (updated) {
                return new ResponseEntity<>("Meal updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Could not find meal with id: " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMeal(@PathVariable("id") Long id) {
        try {
            boolean deleted = mealService.deleteMeal(id);

            if (deleted) {
                return new ResponseEntity<>("Meal deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Could not find meal with id: " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}