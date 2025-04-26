package com.example.backend.service.impl;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;
import com.example.backend.repo.RecipeRepo;

import com.example.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceIMPL implements RecipeService {

    @Autowired
    private RecipeRepo recipeRepo;

    @Override
    public Recipe saveRecipe(RecipeDTO recipeDTO) {
        Recipe recipe = new Recipe();
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setSteps(recipeDTO.getSteps());
        recipe.setCategory(recipeDTO.getCategory());
        recipe.setRating(recipeDTO.getRating());
        recipe.setMediaUrl(recipeDTO.getMediaUrl());
        // If you have other fields like createdDate, you can set them here
        // recipe.setCreatedDate(new Date());

        return recipeRepo.save(recipe);
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        List<Recipe> recipes = recipeRepo.findAll();

        List<RecipeDTO> recipeDTOs = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeDTO dto = new RecipeDTO();
            dto.setId(recipe.getId());
            dto.setTitle(recipe.getTitle());
            dto.setDescription(recipe.getDescription());
            dto.setIngredients(recipe.getIngredients());
            dto.setSteps(recipe.getSteps());
            dto.setCategory(recipe.getCategory());
            dto.setRating(recipe.getRating());
            dto.setMediaUrl(recipe.getMediaUrl());
            recipeDTOs.add(dto);
        }
        return recipeDTOs;
    }
    @Override
    public Recipe updateRecipe(Long id, RecipeDTO recipeDTO) {
        Optional<Recipe> recipeData = recipeRepo.findById(id);

        if (recipeData.isPresent()) {
            Recipe recipe = recipeData.get();
            recipe.setTitle(recipeDTO.getTitle());
            recipe.setDescription(recipeDTO.getDescription());
            recipe.setIngredients(recipeDTO.getIngredients());
            recipe.setSteps(recipeDTO.getSteps());
            recipe.setCategory(recipeDTO.getCategory());
            recipe.setRating(recipeDTO.getRating());
            recipe.setMediaUrl(recipeDTO.getMediaUrl());
            return recipeRepo.save(recipe);
        } else {
            return null;
        }
    }
    public boolean deleteRecipe(Long id) {
        Optional<Recipe> recipe = recipeRepo.findById(id);
        if (recipe.isPresent()) {
            recipeRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}