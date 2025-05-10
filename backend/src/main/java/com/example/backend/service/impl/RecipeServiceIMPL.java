package com.example.backend.service.impl;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;
import com.example.backend.repo.RecipeRepo;
import com.example.backend.service.RecipeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class RecipeServiceIMPL implements RecipeService {

    @Autowired
    private RecipeRepo recipeRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String saveRecipe(RecipeDTO recipeDTO, List<MultipartFile> images) throws IOException {
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

        recipeRepo.save(recipe);
        return "Recipe '" + recipeDTO.getTitle() + "' saved successfully";
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        List<Recipe> recipes = recipeRepo.findAll();
        return modelMapper.map(recipes, new TypeToken<List<RecipeDTO>>() {}.getType());
    }

    @Override
    public RecipeDTO updateRecipe(Long id, RecipeDTO recipeDTO) {
        // Fetch existing recipe by ID
        Recipe existingRecipe = recipeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        // Copy properties from DTO to entity
        BeanUtils.copyProperties(recipeDTO, existingRecipe, "id", "imageUrls");
        
        // Handle image URLs separately if provided
        if (recipeDTO.getImageUrls() != null) {
            existingRecipe.setImageUrls(new HashSet<>(recipeDTO.getImageUrls()));
        }

        // Save updated entity
        Recipe updatedRecipe = recipeRepo.save(existingRecipe);

        // Convert entity to DTO
        RecipeDTO responseDTO = new RecipeDTO();
        BeanUtils.copyProperties(updatedRecipe, responseDTO);

        return responseDTO;
    }

    @Override
    public String deleteRecipe(Long id) {
        if (recipeRepo.existsById(id)) {
            // Delete associated images
            Recipe recipe = recipeRepo.findById(id).orElse(null);
            if (recipe != null && recipe.getImageUrls() != null) {
                for (String imageUrl : recipe.getImageUrls()) {
                    try {
                        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                        Path filePath = Paths.get(uploadDir, fileName);
                        Files.deleteIfExists(filePath);
                    } catch (IOException e) {
                        // Log the error but continue with recipe deletion
                        System.err.println("Error deleting image file: " + e.getMessage());
                    }
                }
            }
            
            recipeRepo.deleteById(id);
            return "Recipe with ID " + id + " deleted successfully";
        } else {
            throw new RuntimeException("Recipe not found");
        }
    }
}