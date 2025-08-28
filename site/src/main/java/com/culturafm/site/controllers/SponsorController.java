package com.culturafm.site.controllers;

import com.culturafm.site.dto.SponsorDTO;
import com.culturafm.site.services.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/sponsors")
// A CORREÇÃO ESTÁ AQUI: Adiciona a anotação CrossOrigin
// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class SponsorController {

    @Autowired
    private SponsorService service;

    @GetMapping
    public ResponseEntity<List<SponsorDTO>> findAll() {
        List<SponsorDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SponsorDTO> findById(@PathVariable Long id) {
        SponsorDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<SponsorDTO> insert(@RequestBody SponsorDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<SponsorDTO> update(@PathVariable Long id, @RequestBody SponsorDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}