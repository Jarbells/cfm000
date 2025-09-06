// site-frontend/src/components/AddEventForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function AddEventForm({ onEventAdded }) {
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        location: '',
        imageUrl: '',
        eventDate: '',
        finishDate: '', // --- NOVO CAMPO ADICIONADO ---
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            // Converte a data de início para ISO se existir
            eventDate: formData.eventDate ? new Date(formData.eventDate).toISOString() : null,
            // Converte a data final para ISO se existir, senão envia null
            finishDate: formData.finishDate ? new Date(formData.finishDate).toISOString() : null,
        };

        axios.post('/api/events', dataToSend)
            .then(() => {
                alert('Evento cadastrado com sucesso!');
                onEventAdded();
                setFormData({ eventName: '', description: '', location: '', imageUrl: '', eventDate: '', finishDate: '' });
            })
            .catch(error => {
                console.error("Erro ao cadastrar evento!", error);
                alert('Erro ao cadastrar o evento.');
            });
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Evento</h2>
            <form onSubmit={handleSubmit}>
                {/* ... (campos existentes) ... */}
                <div className="form-group">
                    <label>Nome do Evento:</label>
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Local:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Data e Hora de Início do Evento:</label>
                    <input type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                </div>
                
                {/* --- NOVO CAMPO DE DATA FINAL --- */}
                <div className="form-group">
                    <label>Data e Hora Final (opcional, para eventos de vários dias):</label>
                    <input type="datetime-local" name="finishDate" value={formData.finishDate} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
                </div>
                <div className="form-group">
                    <label>URL da Imagem de Divulgação:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <button type="submit">Publicar Evento</button>
            </form>
        </div>
    );
}

export default AddEventForm;