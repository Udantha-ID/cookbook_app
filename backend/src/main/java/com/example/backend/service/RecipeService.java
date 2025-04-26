package com.example.backend.service;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;

import java.util.List;

public interface RecipeService {

    Recipe saveRecipe(RecipeDTO recipeDTO);

    List<RecipeDTO> getAllRecipes();
}
