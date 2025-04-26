package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.TechniqueDTO;

public interface TechniqueService {

    String saveTechnique(TechniqueDTO techniqueDTO);
    List<TechniqueDTO> getAllTechniques();
    String updateTechnique(Long techniqueId, TechniqueDTO techniqueDTO);
    String deleteTechnique(Long techniqueId);

}
