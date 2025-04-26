package com.example.backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.TechniqueDTO;
import com.example.backend.entity.Technique;
import com.example.backend.repo.TechniqueRepo;
import com.example.backend.service.TechniqueService;

@Service
public class TechniqueServiceIMPL implements TechniqueService{
    
    @Autowired
    private TechniqueRepo techniqueRepo;

    @Override
    public String saveTechnique(TechniqueDTO techniqueDTO) {
        Technique technique = new Technique();
        technique.setTitle(techniqueDTO.getTitle());
        technique.setDescription(techniqueDTO.getDescription());
        technique.setVideoTutorial(techniqueDTO.getVideoTutorial());
        technique.setDifficultyLevel(techniqueDTO.getDifficultyLevel());
        technique.setTags(techniqueDTO.getTags());
        techniqueRepo.save(technique);
        return "Cooking technique saved successfully!";
    }

    @Override
    public List<TechniqueDTO> getAllTechniques() {
        List<Technique> techniques = techniqueRepo.findAll();
        List<TechniqueDTO> techniqueDTOs = new ArrayList<>();
        
        for(Technique technique : techniques) {
            TechniqueDTO dto = new TechniqueDTO();
            dto.setTechniqueId(technique.getTechniqueId());
            dto.setTitle(technique.getTitle());
            dto.setDescription(technique.getDescription());
            dto.setVideoTutorial(technique.getVideoTutorial());
            dto.setDifficultyLevel(technique.getDifficultyLevel());
            dto.setTags(technique.getTags());
            techniqueDTOs.add(dto);
        }
        return techniqueDTOs;
    }

    @Override
    public String updateTechnique(Long techniqueId, TechniqueDTO techniqueDTO) {
        Optional<Technique> optionalTechnique = techniqueRepo.findById(techniqueId);
        
        if(optionalTechnique.isPresent()) {
            Technique existingTechnique = optionalTechnique.get();
            existingTechnique.setTitle(techniqueDTO.getTitle());
            existingTechnique.setDescription(techniqueDTO.getDescription());
            existingTechnique.setVideoTutorial(techniqueDTO.getVideoTutorial());
            existingTechnique.setDifficultyLevel(techniqueDTO.getDifficultyLevel());
            existingTechnique.setTags(techniqueDTO.getTags());
            
            techniqueRepo.save(existingTechnique);
            return "Technique updated successfully!";
        }
        return "Technique not found with ID: " + techniqueId;
    }

    @Override
    public String deleteTechnique(Long techniqueId) {
        Optional<Technique> optionalTechnique = techniqueRepo.findById(techniqueId);
        
        if(optionalTechnique.isPresent()) {
            techniqueRepo.deleteById(techniqueId);
            return "Technique deleted successfully!";
        }
        return "Technique not found with ID: " + techniqueId;
    }

}
