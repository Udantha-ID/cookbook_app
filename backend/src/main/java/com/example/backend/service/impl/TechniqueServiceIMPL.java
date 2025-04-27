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
        technique.setVideoTutorial(techniqueDTO.getVideoTutorial());
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
                    technique.getVideoTutorial(),
                    technique.getDifficultyLevel(),
                    technique.getTags()
            );
            techniqueDTOList.add(techniqueDTO);
        }

        return techniqueDTOList;
    }

    @Override
    public String updateTechnique(TechniqueDTO techniqueDTO) {
        if (techniqueRepo.existsById(techniqueDTO.getTechniqueId())) {
            Technique technique = techniqueRepo.getReferenceById(techniqueDTO.getTechniqueId());
            technique.setTitle(techniqueDTO.getTitle());
            technique.setDescription(techniqueDTO.getDescription());
            technique.setVideoTutorial(techniqueDTO.getVideoTutorial());
            technique.setDifficultyLevel(techniqueDTO.getDifficultyLevel());
            technique.setTags(techniqueDTO.getTags());

            techniqueRepo.save(technique);
            return "Technique updated successfully!";
        } else {
            return "Technique update failed. No technique found with ID: " + techniqueDTO.getTechniqueId();
        }
    }
}