package com.example.backend.controller;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipe")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/save")
    public String saveRecipe(
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

            String savedRecipe = String.valueOf(recipeService.saveRecipe(recipeDTO, images));
            return "Recipe saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error saving recipe: " + e.getMessage();
        }
    }

    @GetMapping("/get-all")
    public List<RecipeDTO> getAllRecipes() {
        try {
            return recipeService.getAllRecipes();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(
            @PathVariable Long id,
            @RequestBody RecipeDTO recipeDTO) {
        try {
            RecipeDTO updatedRecipe = recipeService.updateRecipe(id, recipeDTO);
            if (updatedRecipe != null) {
                return ResponseEntity.ok(updatedRecipe);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRecipe(@PathVariable Long id) {
        try {
            recipeService.deleteRecipe(id);
            return "Recipe deleted successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error deleting recipe: " + e.getMessage();
        }
    }
}
