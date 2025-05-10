package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Recipe")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "dish_id"))
    @Column(name = "ingredient")
    private List<String> ingredients;

    @ElementCollection
    @CollectionTable(name = "recipe_steps", joinColumns = @JoinColumn(name = "dish_id"))
    @Column(name = "step", length = 1000)
    private List<String> steps;

    private String category;

    private Double rating;

    @ElementCollection
    @CollectionTable(name = "recipe_images", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "image_url", length = 1000)
    private Set<String> imageUrls = new HashSet<>();

    public void setMediaType(String image) {
    }
}