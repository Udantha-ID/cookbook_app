package com.example.backend.service;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.entity.Recipe;

public interface RecipeService {

    Recipe saveRecipe(RecipeDTO recipeDTO);
}
