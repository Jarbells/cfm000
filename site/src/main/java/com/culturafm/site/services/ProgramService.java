// src/main/java/com/culturafm/site/services/ProgramService.java

package com.culturafm.site.services;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.culturafm.site.dto.LocutorDTO;
import com.culturafm.site.dto.ProgramDTO;
import com.culturafm.site.entities.Locutor;
import com.culturafm.site.entities.Program;
import com.culturafm.site.entities.ProgramImage;
import com.culturafm.site.repository.LocutorRepository;
import com.culturafm.site.repository.ProgramRepository;
import com.culturafm.site.services.exceptions.ResourceConflictException;
import com.culturafm.site.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProgramService {

	@Autowired
	private ProgramRepository programRepository;

	@Autowired
	private LocutorRepository locutorRepository;
	
	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@Transactional(readOnly = true)
	public ProgramDTO findById(Long id) {
		Program entity = programRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Programa não encontrado com o ID: " + id));
		return new ProgramDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<ProgramDTO> findAll(Pageable pageable) {
		Page<Program> page = programRepository.findAll(pageable);
		return page.map(ProgramDTO::new);
	}

	@Transactional
	public ProgramDTO insert(ProgramDTO dto) {
		validateConflict(dto, null); 
		
		Program entity = new Program();
		copyDtoToEntity(dto, entity);
		entity = programRepository.save(entity);
		messagingTemplate.convertAndSend("/topic/programs", "updated");
		return new ProgramDTO(entity);
	}
	
	@Transactional
	public ProgramDTO update(Long id, ProgramDTO dto) {
		try {
			Program entity = programRepository.findById(id)
					.orElseThrow(() -> new EntityNotFoundException("Programa não encontrado com o ID: " + id));
			
			validateConflict(dto, id);
			
			copyDtoToEntity(dto, entity);
			entity = programRepository.save(entity);
			messagingTemplate.convertAndSend("/topic/programs", "updated");
			return new ProgramDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Não foi possível atualizar. Programa não encontrado com o ID: " + id);
		}
	}
	
	public void delete(Long id) {
		try {
			programRepository.deleteById(id);
			messagingTemplate.convertAndSend("/topic/programs", "updated");
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Não foi possível deletar. Programa não encontrado com o ID: " + id);
		}
	}
	
	private void copyDtoToEntity(ProgramDTO dto, Program entity) {
		entity.setName(dto.getName());
		entity.setDaysOfWeek(dto.getDaysOfWeek());
		entity.setStartTime(dto.getStartTime());
		entity.setEndTime(dto.getEndTime());
		
		// A CORREÇÃO ESTÁ AQUI: Em vez de modificar a lista existente, criamos e substituímos por uma nova.
		// Isto é mais robusto e evita problemas de estado da sessão do Hibernate.
		Set<ProgramImage> newImages = new HashSet<>();
		for (String imgUrl : dto.getImageUrls()) {
			ProgramImage img = new ProgramImage();
			img.setImageUrl(imgUrl);
			img.setProgram(entity);
			newImages.add(img);
		}
		entity.getImages().clear();
		entity.getImages().addAll(newImages);


		entity.getAnnouncers().clear();
		for (LocutorDTO locutorDto : dto.getAnnouncers()) {
			Locutor locutor = locutorRepository.findById(locutorDto.getId())
					.orElseThrow(() -> new ResourceNotFoundException("Locutor não encontrado com o ID: " + locutorDto.getId()));
			entity.getAnnouncers().add(locutor);
		}
	}
	
	// ... (o resto da classe continua igual) ...
	private void validateConflict(ProgramDTO dto, Long programIdToIgnore) {
		LocalTime newStartTime = dto.getStartTime();
		LocalTime newEndTime = dto.getEndTime();
		Set<String> newDays = parseDaysOfWeek(dto.getDaysOfWeek());
		
		List<Program> existingPrograms = programRepository.findAll();
		
		for (Program existing : existingPrograms) {
			if (existing.getId().equals(programIdToIgnore)) {
				continue;
			}
			
			LocalTime existingStartTime = existing.getStartTime();
			LocalTime existingEndTime = existing.getEndTime();
			
			boolean timeOverlap = newStartTime.isBefore(existingEndTime) && existingStartTime.isBefore(newEndTime);
			
			if (timeOverlap) {
				Set<String> existingDays = parseDaysOfWeek(existing.getDaysOfWeek());
				existingDays.retainAll(newDays);
				if (!existingDays.isEmpty()) {
					throw new ResourceConflictException("Conflito de horário! O programa '" 
							+ existing.getName() + "' já ocupa o horário no(s) dia(s) " + existingDays);
				}
			}
		}
	}
	
	private Set<String> parseDaysOfWeek(String days) {
		days = days.toLowerCase();
		Set<String> parsedDays = new HashSet<>();
		
		if (days.contains("segunda a sexta")) {
			parsedDays.addAll(Arrays.asList("seg", "ter", "qua", "qui", "sex"));
		} else if (days.contains("segunda a sábado")) {
			parsedDays.addAll(Arrays.asList("seg", "ter", "qua", "qui", "sex", "sab"));
		} else if (days.contains("segunda a quinta")) {
			parsedDays.addAll(Arrays.asList("seg", "ter", "qua", "qui"));
		}

		if (days.contains("sexta-feira")) {
			parsedDays.add("sex");
		}
		if (days.contains("sábado")) {
			parsedDays.add("sab");
		}
		if (days.contains("domingo")) {
			parsedDays.add("dom");
		}
		return parsedDays;
	}
}
