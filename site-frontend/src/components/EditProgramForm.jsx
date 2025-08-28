// src/components/EditProgramForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProgramForm({ programToEdit, onUpdate, onCancel }) {
    // CORREÇÃO: Usamos apenas um estado para todos os dados do formulário
    const [formData, setFormData] = useState({
        ...programToEdit,
        startTime: programToEdit.startTime.substring(0, 5),
        endTime: programToEdit.endTime.substring(0, 5),
    });
    
    const [allLocutores, setAllLocutores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/locutores')
            .then(response => {
                setAllLocutores(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar locutores!", error);
            });
    }, []);

    useEffect(() => {
        setFormData({
            ...programToEdit,
            startTime: programToEdit.startTime.substring(0, 5),
            endTime: programToEdit.endTime.substring(0, 5),
        });
    }, [programToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // CORREÇÃO: Lógica para o campo de texto das imagens
    const handleImageUrlsChange = (e) => {
        const urls = e.target.value.split('\n');
        setFormData(prev => ({ ...prev, imageUrls: urls }));
    };

    const handleLocutorChange = (e) => {
        const locutorId = parseInt(e.target.value);
        const isChecked = e.target.checked;
        let currentAnnouncers = formData.announcers || [];

        if (isChecked) {
            setFormData(prev => ({ ...prev, announcers: [...currentAnnouncers, { id: locutorId }] }));
        } else {
            setFormData(prev => ({
                ...prev,
                announcers: currentAnnouncers.filter(locutor => locutor.id !== locutorId)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filtra URLs vazias antes de enviar
        const dataToSend = {
            ...formData,
            imageUrls: formData.imageUrls.filter(url => url.trim() !== '')
        };
        console.log("Dados a serem enviados:", dataToSend); 

        onUpdate(dataToSend.id, dataToSend);
    };

    const isLocutorChecked = (locutorId) => {
        return formData.announcers.some(announcer => announcer.id === locutorId);
    };

    return (
        <div className="form-container">
            <h2>Editar Programa</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Programa:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Dias da Semana:</label>
                    <input type="text" name="daysOfWeek" value={formData.daysOfWeek} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Horário de Início:</label>
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Horário de Fim:</label>
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>URLs das Imagens de Fundo (uma por linha):</label>
                    <textarea 
                        name="imageUrls"
                        value={formData.imageUrls.join('\n')}
                        onChange={handleImageUrlsChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Locutores:</label>
                    <div className="checkbox-group">
                        {allLocutores.map(locutor => (
                            <label key={locutor.id}>
                                <input
                                    type="checkbox"
                                    value={locutor.id}
                                    checked={isLocutorChecked(locutor.id)}
                                    onChange={handleLocutorChange}
                                />
                                {locutor.name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditProgramForm;
