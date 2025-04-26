package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.TechniqueDTO;
import com.example.backend.service.TechniqueService;

@RestController
@RequestMapping("/api/techniques")
@CrossOrigin(origins = "http://localhost:3000")
public class TechniqueController {

    @Autowired
    private TechniqueService techniqueService;

    @PostMapping
    public String saveTechnique(@RequestBody TechniqueDTO techniqueDTO) {
        return techniqueService.saveTechnique(techniqueDTO);
    }

    @GetMapping
    public List<TechniqueDTO> getAllTechniques() {
        return techniqueService.getAllTechniques();
    }

    @PutMapping("/{techniqueId}")
    public String updateTechnique(@PathVariable Long techniqueId, @RequestBody TechniqueDTO techniqueDTO) {
        return techniqueService.updateTechnique(techniqueId, techniqueDTO);
    }

    @DeleteMapping("/{techniqueId}")
    public String deleteTechnique(@PathVariable Long techniqueId) {
        return techniqueService.deleteTechnique(techniqueId);
    }

}
