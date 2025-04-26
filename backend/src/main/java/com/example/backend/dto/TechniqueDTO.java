package com.example.backend.dto;

import lombok.Data;

@Data
public class TechniqueDTO {
    
    private Long techniqueId;
    private String title;
    private String description;
    private String videoTutorial;
    private String difficultyLevel;
    private String tags;

}
