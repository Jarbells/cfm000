// src/components/AddProgramForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProgramForm({ onProgramAdded }) {
    // O estado agora contém 'imageUrls' como um array desde o início
    const [formData, setFormData] = useState({
        name: '',
        daysOfWeek: '',
        startTime: '',
        endTime: '',
        imageUrls: [],
        announcers: []
    });

    const [allLocutores, setAllLocutores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/locutores')
            .then(response => {
                setAllLocutores(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar locutores para o formulário!", error);
            });
    }, []);

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

        if (isChecked) {
            setFormData(prev => ({ ...prev, announcers: [...prev.announcers, { id: locutorId }] }));
        } else {
            setFormData(prev => ({
                ...prev,
                announcers: prev.announcers.filter(locutor => locutor.id !== locutorId)
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

        axios.post('http://localhost:8080/programas', dataToSend)
            .then(() => {
                alert('Programa cadastrado com sucesso!');
                onProgramAdded();
                setFormData({ name: '', daysOfWeek: '', startTime: '', endTime: '', imageUrls: [], announcers: [] });
            })
            .catch(error => {
                console.error("Erro ao cadastrar programa!", error);
                alert('Erro ao cadastrar o programa.');
            });
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Programa</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Programa:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Dias da Semana (ex: Segunda a Sexta):</label>
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
                        placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
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
                                    onChange={handleLocutorChange}
                                    checked={formData.announcers.some(a => a.id === locutor.id)}
                                />
                                {locutor.name}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Cadastrar Programa</button>
            </form>
        </div>
    );
}

export default AddProgramForm;
