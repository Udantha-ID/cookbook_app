package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechniqueDTO {
    private Long techniqueId;
    private String title;
    private String description;
    private String imageUrl;  // Changed from videoTutorial to imageUrl
    private String difficultyLevel;
    private String tags;
}