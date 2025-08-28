package com.culturafm.site.entities;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_program")
public class Program {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(name = "days_of_week")
	private String daysOfWeek;

	@Column(name = "start_time")
	private LocalTime startTime;

	@Column(name = "end_time")
	private LocalTime endTime;

	@OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProgramImage> images = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "tb_program_locutor",
			   joinColumns = @JoinColumn(name = "program_id"),
			   inverseJoinColumns = @JoinColumn(name = "locutor_id"))
	private Set<Locutor> announcers = new HashSet<>();

	// Construtor padrão (obrigatório pelo JPA)
	public Program() {
	}

	// CORREÇÃO: Construtor com todos os campos atualizado. Removi o antigo parâmetro "presenter".
	// Não incluí coleções (Set) no construtor com argumentos, pois elas são gerenciadas de outra forma.
	public Program(Long id, String name, String daysOfWeek, LocalTime startTime, LocalTime endTime) {
		this.id = id;
		this.name = name;
		this.daysOfWeek = daysOfWeek;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	// Getters e Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDaysOfWeek() {
		return daysOfWeek;
	}

	public void setDaysOfWeek(String daysOfWeek) {
		this.daysOfWeek = daysOfWeek;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public Set<ProgramImage> getImages() {
		return images;
	}

	public void setImages(Set<ProgramImage> images) {
		this.images = images;
	}

	// CORREÇÃO: Faltava o getter para a nova coleção de locutores.
	public Set<Locutor> getAnnouncers() {
		return announcers;
	}

	// CORREÇÃO: Adicionei o setter também, para consistência.
	public void setAnnouncers(Set<Locutor> announcers) {
		this.announcers = announcers;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Program other = (Program) obj;
		return Objects.equals(id, other.id);
	}
}