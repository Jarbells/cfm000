// src/main/java/com/culturafm/site/controllers/LocutorController.java

package com.culturafm.site.controllers;

import com.culturafm.site.dto.LocutorDTO;
import com.culturafm.site.services.LocutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/locutores") // O endpoint base para tudo relacionado a locutores
// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class LocutorController {

    @Autowired
    private LocutorService service;

    @GetMapping
    public ResponseEntity<List<LocutorDTO>> findAll() {
        List<LocutorDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<LocutorDTO> findById(@PathVariable Long id) {
        LocutorDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<LocutorDTO> insert(@RequestBody LocutorDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<LocutorDTO> update(@PathVariable Long id, @RequestBody LocutorDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}