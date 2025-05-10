package com.example.backend.service.impl;

import com.example.backend.repo.TechniqueRepo;
import com.example.backend.service.TechniqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.dto.TechniqueDTO;
import com.example.backend.entity.Technique;
import java.util.ArrayList;
import java.util.List;

@Service
public class TechniqueServiceIMPL implements TechniqueService {
    @Autowired
    private TechniqueRepo techniqueRepo;

    @Override
    public String saveTechnique(TechniqueDTO techniqueDTO) {
        Technique technique = new Technique();
        technique.setTitle(techniqueDTO.getTitle());
        technique.setDescription(techniqueDTO.getDescription());
        technique.setImageUrl(techniqueDTO.getImageUrl());  // Changed from setVideoTutorial to setImageUrl
        technique.setDifficultyLevel(techniqueDTO.getDifficultyLevel());
        technique.setTags(techniqueDTO.getTags());

        techniqueRepo.save(technique);
        return "Technique saved successfully!";
    }

    @Override
    public List<TechniqueDTO> getAllTechniques() {
        List<Technique> allTechniques = techniqueRepo.findAll();
        List<TechniqueDTO> techniqueDTOList = new ArrayList<>();

        for (Technique technique : allTechniques) {
            TechniqueDTO techniqueDTO = new TechniqueDTO(
                    technique.getTechniqueId(),
                    technique.getTitle(),
                    technique.getDescription(),
                    technique.getImageUrl(),  // Changed from getVideoTutorial to getImageUrl
                    technique.getDifficultyLevel(),
                    technique.getTags()
            );
            techniqueDTOList.add(techniqueDTO);
        }
        return techniqueDTOList;
    }

    @Override
    public String updateTechnique(TechniqueDTO techniqueDTO) {
        if (techniqueDTO.getTechniqueId() == null) {
            return "Technique update failed. No technique ID provided.";
        }

        if (!techniqueRepo.existsById(techniqueDTO.getTechniqueId())) {
            return "Technique update failed. No technique found with ID: " + techniqueDTO.getTechniqueId();
        }

        try {
            Technique technique = techniqueRepo.getReferenceById(techniqueDTO.getTechniqueId());
            
            // Only update fields that are not null
            if (techniqueDTO.getTitle() != null) {
                technique.setTitle(techniqueDTO.getTitle());
            }
            if (techniqueDTO.getDescription() != null) {
                technique.setDescription(techniqueDTO.getDescription());
            }
            if (techniqueDTO.getImageUrl() != null) {
                technique.setImageUrl(techniqueDTO.getImageUrl());
            }
            if (techniqueDTO.getDifficultyLevel() != null) {
                technique.setDifficultyLevel(techniqueDTO.getDifficultyLevel());
            }
            if (techniqueDTO.getTags() != null) {
                technique.setTags(techniqueDTO.getTags());
            }

            techniqueRepo.save(technique);
            return "Technique updated successfully!";
        } catch (Exception e) {
            return "Technique update failed. Error: " + e.getMessage();
        }
    }

    @Override
    public String deleteTechnique(Long techniqueId) {
        if (techniqueRepo.existsById(techniqueId)) {
            techniqueRepo.deleteById(techniqueId);
            return "Technique deleted successfully!";
        } else {
            return "Technique delete failed. No technique found with ID: " + techniqueId;
        }
    }
}