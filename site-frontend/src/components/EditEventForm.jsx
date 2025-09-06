// site-frontend/src/components/EditEventForm.jsx

import React, { useState, useEffect } from 'react';

function EditEventForm({ eventToEdit, onUpdate, onCancel }) {
    const [formData, setFormData] = useState(eventToEdit);

    const formatDateTimeForInput = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toISOString().slice(0, 16);
    };

    useEffect(() => {
        setFormData({
            ...eventToEdit,
            eventDate: formatDateTimeForInput(eventToEdit.eventDate),
            finishDate: formatDateTimeForInput(eventToEdit.finishDate) // --- LINHA ADICIONADA ---
        });
    }, [eventToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            eventDate: formData.eventDate ? new Date(formData.eventDate).toISOString() : null,
            finishDate: formData.finishDate ? new Date(formData.finishDate).toISOString() : null,
        };
        onUpdate(dataToSend.id, dataToSend);
    };

    return (
        <div className="form-container">
            <h2>Editar Evento</h2>
            <form onSubmit={handleSubmit}>
                {/* ... (campos existentes) ... */}
                <div className="form-group">
                    <label>Nome do Evento:</label>
                    <input type="text" name="eventName" value={formData.eventName || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Local:</label>
                    <input type="text" name="location" value={formData.location || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Data e Hora de Início do Evento:</label>
                    <input type="datetime-local" name="eventDate" value={formData.eventDate || ''} onChange={handleChange} required />
                </div>
                
                {/* --- CAMPO DE DATA FINAL ATUALIZADO --- */}
                <div className="form-group">
                    <label>Data e Hora Final (opcional):</label>
                    <input type="datetime-local" name="finishDate" value={formData.finishDate || ''} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" />
                </div>
                <div className="form-group">
                    <label>URL da Imagem de Divulgação:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditEventForm;