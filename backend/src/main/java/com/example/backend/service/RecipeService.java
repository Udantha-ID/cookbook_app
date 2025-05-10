package com.example.backend.service;

import com.example.backend.dto.RecipeDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RecipeService {

    String saveRecipe(RecipeDTO recipeDTO, List<MultipartFile> images) throws IOException;

    List<RecipeDTO> getAllRecipes();

    RecipeDTO updateRecipe(Long id, RecipeDTO recipeDTO);

    String deleteRecipe(Long id);
}
