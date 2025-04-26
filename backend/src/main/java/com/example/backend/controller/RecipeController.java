package com.example.backend.controller;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;
import com.example.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/recipe")
@CrossOrigin

public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @PostMapping("/save")
    public ResponseEntity<Recipe> createDish(@RequestBody RecipeDTO recipeDTO) {
        try {
            Recipe savedRecipe = recipeService.saveRecipe(recipeDTO);
            return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
