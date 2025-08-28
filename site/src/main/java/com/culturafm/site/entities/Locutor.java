// src/main/java/com/culturafm/site/entities/Locutor.java

package com.culturafm.site.entities;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_locutor")
public class Locutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT") // Ideal para textos longos
    private String bio;

    @Column(name = "photo_url")
    private String photoUrl;

    @JsonIgnore
    @ManyToMany(mappedBy = "announcers")
    private Set<Program> programs = new HashSet<>();

    public Locutor() {
    }

    public Locutor(Long id, String name, String bio, String photoUrl) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.photoUrl = photoUrl;
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Set<Program> getPrograms() {
        return programs;
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
        Locutor other = (Locutor) obj;
        return Objects.equals(id, other.id);
    }
}