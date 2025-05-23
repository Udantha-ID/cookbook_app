package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
    private Long id;
    private String title;
    private String description;
    private List<String> ingredients;
    private List<String> steps;
    private String category;
    private Double rating;
    private Set<String> imageUrls;
}
