// src/components/RadioInfoForm.jsx

import React, { useState, useEffect } from 'react';

function RadioInfoForm({ initialData, onSave }) {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };
    
    // Previne que o formulário seja submetido ao pressionar Enter num campo
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                
                {/* --- SEÇÃO DE IDENTIDADE DA RÁDIO --- */}
                <h2>Informações Gerais da Rádio</h2>
                <div className="form-group">
                    <label>Nome da Rádio:</label>
                    <input type="text" name="radioName" value={formData.radioName || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Slogan:</label>
                    <input type="text" name="slogan" value={formData.slogan || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>URL do Logótipo:</label>
                    <input type="text" name="logoUrl" value={formData.logoUrl || ''} onChange={handleChange} />
                </div>
                
                <hr className="form-divider" />

                <div className="form-grid">
                    {/* Coluna da Esquerda: Endereço */}
                    <div className="form-column">
                        <h3>Endereço</h3>
                        <div className="form-group">
                            <label>Rua / Avenida:</label>
                            <input type="text" name="addressStreet" value={formData.addressStreet || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Número:</label>
                            <input type="text" name="addressNumber" value={formData.addressNumber || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Bairro:</label>
                            <input type="text" name="addressNeighborhood" value={formData.addressNeighborhood || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Cidade:</label>
                            <input type="text" name="addressCity" value={formData.addressCity || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Estado (UF):</label>
                            <input type="text" name="addressState" value={formData.addressState || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>CEP:</label>
                            <input type="text" name="addressZipCode" value={formData.addressZipCode || ''} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Coluna da Direita: Contactos e Redes Sociais */}
                    <div className="form-column">
                        <h3>Contactos</h3>
                        <div className="form-group">
                            <label>Telefone Principal:</label>
                            <input type="text" name="phonePrimary" value={formData.phonePrimary || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>WhatsApp:</label>
                            <input type="text" name="phoneWhatsapp" value={formData.phoneWhatsapp || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>E-mail de Contacto:</label>
                            <input type="email" name="emailContact" value={formData.emailContact || ''} onChange={handleChange} />
                        </div>

                        <h3>Redes Sociais</h3>
                        <div className="form-group">
                            <label>URL do Instagram:</label>
                            <input type="text" name="socialInstagramUrl" value={formData.socialInstagramUrl || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>URL do Facebook:</label>
                            <input type="text" name="socialFacebookUrl" value={formData.socialFacebookUrl || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>URL do YouTube:</label>
                            <input type="text" name="socialYoutubeUrl" value={formData.socialYoutubeUrl || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>URL do X (Twitter):</label>
                            <input type="text" name="socialXUrl" value={formData.socialXUrl || ''} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <hr className="form-divider" />
                
                <button type="submit">Guardar Alterações</button>
            </form>
        </div>
    );
}

export default RadioInfoForm;
