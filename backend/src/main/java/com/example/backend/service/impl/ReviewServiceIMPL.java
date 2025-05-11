package com.example.backend.service.impl;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.entity.Review;
import com.example.backend.entity.Recipe;
import com.example.backend.repo.ReviewRepo;
import com.example.backend.repo.RecipeRepo;
import com.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceIMPL implements ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private RecipeRepo recipeRepo;

    @Override
    @Transactional
    public String saveReview(ReviewDTO reviewDTO) {
        try {
            // Find the recipe
            Recipe recipe = recipeRepo.findById(reviewDTO.getRecipeId())
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + reviewDTO.getRecipeId()));

            Review review = Review.builder()
                .name(reviewDTO.getName())
                .comment(reviewDTO.getComment())
                .rating(reviewDTO.getRating())
                .recipe(recipe)
                .build();
            
            reviewRepo.save(review);
            return "Review saved successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Error saving review: " + e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getAllReviews() {
        try {
            List<Review> reviews = reviewRepo.findAll();
            List<ReviewDTO> reviewDTOs = new ArrayList<>();
            
            for (Review review : reviews) {
                ReviewDTO dto = ReviewDTO.builder()
                    .id(review.getId())
                    .name(review.getName())
                    .comment(review.getComment())
                    .rating(review.getRating())
                    .recipeId(review.getRecipe().getId())
                    .build();
                reviewDTOs.add(dto);
            }
            return reviewDTOs;
        } catch (Exception e) {
            throw new RuntimeException("Error getting reviews: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public String updateReview(Long id, ReviewDTO reviewDTO) {
        try {
            Optional<Review> optionalReview = reviewRepo.findById(id);
            if (optionalReview.isPresent()) {
                Review existingReview = optionalReview.get();
                existingReview.setName(reviewDTO.getName());
                existingReview.setComment(reviewDTO.getComment());
                existingReview.setRating(reviewDTO.getRating());
                
                reviewRepo.save(existingReview);
                return "Review updated successfully!";
            }
            return "Review not found with id: " + id;
        } catch (Exception e) {
            throw new RuntimeException("Error updating review: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public String deleteReview(Long id) {
        try {
            if (reviewRepo.existsById(id)) {
                reviewRepo.deleteById(id);
                return "Review deleted successfully!";
            }
            return "Review not found with id: " + id;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting review: " + e.getMessage());
        }
    }
}
