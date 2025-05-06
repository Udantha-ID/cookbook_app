package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/technique")
@CrossOrigin
public class TechniqueController {

    @Autowired
    private TechniqueService techniqueService;

    @PostMapping(path = "/save")
    public String saveTechnique(@RequestBody TechniqueDTO techniqueDTO) {
        String message = techniqueService.saveTechnique(techniqueDTO);
        return message;
    }

    @GetMapping(path = "/get-all-techniques")
    public List<TechniqueDTO> getAllTechniques() {
        return techniqueService.getAllTechniques();
    }

    @PutMapping(path = "/update/{id}")
    public String updateTechnique(@RequestBody TechniqueDTO techniqueDTO) {
        String message = techniqueService.updateTechnique(techniqueDTO);
        return message;
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteTechnique(@PathVariable(value = "id") Long techniqueId) {
        String message = techniqueService.deleteTechnique(techniqueId);
        return message;
    }
}