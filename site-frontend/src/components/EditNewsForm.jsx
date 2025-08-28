// src/components/EditNewsForm.jsx

import React, { useState, useEffect } from 'react';

function EditNewsForm({ newsToEdit, onUpdate, onCancel }) {
    const [formData, setFormData] = useState(newsToEdit);

    useEffect(() => {
        setFormData(newsToEdit);
    }, [newsToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData.id, formData);
    };

    return (
        <div className="form-container">
            <h2>Editar Notícia</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Subtítulo:</label>
                    <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Conteúdo:</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} rows="5" required />
                </div>
                <div className="form-group">
                    <label>Autor:</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>URL da Imagem de Capa:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                
                {/* CORREÇÃO: Adicionados os campos que faltavam */}
                <div className="form-group">
                    <label>Fonte da Notícia (ex: G1, O Povo):</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Créditos da Imagem (ex: Foto: João Silva):</label>
                    <input type="text" name="imageCredit" value={formData.imageCredit} onChange={handleChange} />
                </div>

                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditNewsForm;
