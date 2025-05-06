package com.example.backend.service;

import com.example.backend.dto.TechniqueDTO;

import java.util.List;

public interface TechniqueService {
    String saveTechnique(TechniqueDTO techniqueDTO);

    List<TechniqueDTO> getAllTechniques();

    String updateTechnique(TechniqueDTO techniqueDTO);

    String deleteTechnique(Long techniqueId);
}
