package com.example.backend.service.impl;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;
import com.example.backend.repo.RecipeRepo;

import com.example.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RecipeServiceIMPL implements RecipeService {

    @Autowired
    private RecipeRepo recipeRepo;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public RecipeDTO saveRecipe(RecipeDTO recipeDTO, List<MultipartFile> images) throws IOException {
        Recipe recipe = new Recipe();
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setSteps(recipeDTO.getSteps());
        recipe.setCategory(recipeDTO.getCategory());
        recipe.setRating(recipeDTO.getRating() != null ? recipeDTO.getRating() : 0.0);
        
        // Handle image uploads
        Set<String> imageUrls = new HashSet<>();
        if (images != null && !images.isEmpty()) {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save each image
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(image.getInputStream(), filePath);
                    imageUrls.add("/uploads/" + fileName);
                }
            }
        }
        recipe.setImageUrls(imageUrls);

        Recipe savedRecipe = recipeRepo.save(recipe);
        return convertToDTO(savedRecipe);
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        List<Recipe> recipes = recipeRepo.findAll();
        return recipes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RecipeDTO updateRecipe(Long id, RecipeDTO recipeDTO) {
        Optional<Recipe> recipeData = recipeRepo.findById(id);

        if (recipeData.isPresent()) {
            Recipe recipe = recipeData.get();
            recipe.setTitle(recipeDTO.getTitle());
            recipe.setDescription(recipeDTO.getDescription());
            recipe.setIngredients(recipeDTO.getIngredients());
            recipe.setSteps(recipeDTO.getSteps());
            recipe.setCategory(recipeDTO.getCategory());
            recipe.setRating(recipeDTO.getRating() != null ? recipeDTO.getRating() : recipe.getRating());
            
            // Handle image URLs
            if (recipeDTO.getImageUrls() != null) {
                recipe.setImageUrls(new HashSet<>(recipeDTO.getImageUrls()));
            }

            Recipe updatedRecipe = recipeRepo.save(recipe);
            return convertToDTO(updatedRecipe);
        } else {
            return null;
        }
    }

    @Override
    public void deleteRecipe(Long id) {
        recipeRepo.deleteById(id);
    }

    private RecipeDTO convertToDTO(Recipe recipe) {
        RecipeDTO dto = new RecipeDTO();
        dto.setId(recipe.getId());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setIngredients(recipe.getIngredients());
        dto.setSteps(recipe.getSteps());
        dto.setCategory(recipe.getCategory());
        dto.setRating(recipe.getRating());
        dto.setImageUrls(recipe.getImageUrls());
        return dto;
    }
}