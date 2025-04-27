package com.example.backend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Technique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long techniqueId;
    private String title;
    private String description;
    private String videoTutorial;
    private String difficultyLevel;
    private String tags;

}