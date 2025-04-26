package com.example.backend.service.impl;

import com.example.backend.dto.ReviewDTO;
import com.example.backend.entity.Review;
import com.example.backend.repo.ReviewRepo;
import com.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceIMPL implements ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Override
    public String saveReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setName(reviewDTO.getName());
        review.setComment(reviewDTO.getComment());
        review.setRating(reviewDTO.getRating());
        // If you have a created date field, you can set it here
        // review.setCreatedAt(new Date());
        reviewRepo.save(review);
        return "Review saved successfully!";
    }

    @Override
    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepo.findAll();

        List<ReviewDTO> reviewDTOs = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDTO dto = new ReviewDTO();
            dto.setId(review.getId());
            dto.setName(review.getName());
            dto.setComment(review.getComment());
            dto.setRating(review.getRating());
            reviewDTOs.add(dto);
        }
        return reviewDTOs;
    }

    @Override
    public String updateReview(Long id, ReviewDTO reviewDTO) {
        Optional<Review> optionalReview = reviewRepo.findById(id);

        if (optionalReview.isPresent()) {
            Review existingReview = optionalReview.get();
            existingReview.setName(reviewDTO.getName());
            existingReview.setComment(reviewDTO.getComment());
            existingReview.setRating(reviewDTO.getRating());

            reviewRepo.save(existingReview);
            return "Review updated successfully!";
        } else {
            return "Review not found with id: " + id;
        }
    }

    @Override
    public String deleteReview(Long id) {
        Optional<Review> optionalReview = reviewRepo.findById(id);

        if (optionalReview.isPresent()) {
            reviewRepo.deleteById(id);
            return "Review deleted successfully!";
        } else {
            return "Review not found with id: " + id;
        }
    }
}
