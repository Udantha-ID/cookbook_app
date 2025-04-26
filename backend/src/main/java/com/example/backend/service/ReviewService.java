package com.example.backend.service;

import com.example.backend.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    String saveReview(ReviewDTO reviewDTO);

    List<ReviewDTO> getAllReviews();

    String updateReview(Long id, ReviewDTO reviewDTO);

    String deleteReview(Long id);
}


