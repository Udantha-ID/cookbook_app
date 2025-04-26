package com.example.backend.controller;


import com.example.backend.dto.ReviewDTO;
import com.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/review")
@CrossOrigin //Security Perpose walata use krnne
public class ReviewController {

    //Anjana
    @Autowired
    private ReviewService reviewService;

    @PostMapping(path = "/save")
    public String saveReview(@RequestBody ReviewDTO reviewDTO) {
        String message = reviewService.saveReview(reviewDTO);
        return message;
    }

    @GetMapping(path = "/get-all-reviews")
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PutMapping(path = "/update/{id}")
    public String updateReview(@PathVariable Long id, @RequestBody ReviewDTO reviewDTO) {
        String message = reviewService.updateReview(id, reviewDTO);
        return message;
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteReview(@PathVariable Long id) {
        String message = reviewService.deleteReview(id);
        return message;
    }
}
