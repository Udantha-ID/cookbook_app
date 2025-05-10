package com.example.backend.controller;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;
import com.example.backend.service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/recipe")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping(value = "/save", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createDish(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("ingredients") String ingredients,
            @RequestParam("steps") String steps,
            @RequestParam("category") String category,
            @RequestParam(value = "rating", required = false) Double rating,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        try {
            RecipeDTO recipeDTO = new RecipeDTO();
            recipeDTO.setTitle(title);
            recipeDTO.setDescription(description);
            recipeDTO.setIngredients(objectMapper.readValue(ingredients, List.class));
            recipeDTO.setSteps(objectMapper.readValue(steps, List.class));
            recipeDTO.setCategory(category);
            recipeDTO.setRating(rating);

            RecipeDTO savedRecipe = recipeService.saveRecipe(recipeDTO, images);
            return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("get-all")
    public ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        try {
            List<RecipeDTO> recipes = recipeService.getAllRecipes();
            return new ResponseEntity<>(recipes, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Debug log
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable Long id, @RequestBody RecipeDTO recipeDTO) {
        try {
            RecipeDTO updatedRecipe = recipeService.updateRecipe(id, recipeDTO);
            if (updatedRecipe != null) {
                return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Debug log
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable Long id) {
        try {
            recipeService.deleteRecipe(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace(); // Debug log
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
