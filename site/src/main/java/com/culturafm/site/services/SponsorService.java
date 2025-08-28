package com.culturafm.site.services;

import com.culturafm.site.dto.SponsorDTO;
import com.culturafm.site.entities.Sponsor;
import com.culturafm.site.repository.SponsorRepository;
import com.culturafm.site.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SponsorService {

    @Autowired
    private SponsorRepository repository;

    @Transactional(readOnly = true)
    public List<SponsorDTO> findAll() {
        // Busca todos os patrocinadores, ordenados pelo campo 'displayOrder'
        List<Sponsor> list = repository.findAll(Sort.by(Sort.Direction.ASC, "displayOrder"));
        return list.stream().map(SponsorDTO::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SponsorDTO findById(Long id) {
        Sponsor entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patrocinador não encontrado com o ID: " + id));
        return new SponsorDTO(entity);
    }

    @Transactional
    public SponsorDTO insert(SponsorDTO dto) {
        Sponsor entity = new Sponsor();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new SponsorDTO(entity);
    }

    @Transactional
    public SponsorDTO update(Long id, SponsorDTO dto) {
        try {
            Sponsor entity = repository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new SponsorDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não foi possível atualizar. Patrocinador não encontrado com o ID: " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Não foi possível deletar. Patrocinador não encontrado com o ID: " + id);
        }
    }

    private void copyDtoToEntity(SponsorDTO dto, Sponsor entity) {
        entity.setName(dto.getName());
        entity.setLogoUrl(dto.getLogoUrl());
        entity.setWebsiteUrl(dto.getWebsiteUrl());
        entity.setDisplayOrder(dto.getDisplayOrder());
    }
}
