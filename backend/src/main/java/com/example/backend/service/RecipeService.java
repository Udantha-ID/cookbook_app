package com.example.backend.service;

import com.example.backend.dto.RecipeDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RecipeService {

    RecipeDTO saveRecipe(RecipeDTO recipeDTO, List<MultipartFile> images) throws IOException;

    List<RecipeDTO> getAllRecipes();

    RecipeDTO updateRecipe(Long id, RecipeDTO recipeDTO);

    void deleteRecipe(Long id);
}
