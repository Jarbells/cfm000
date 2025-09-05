// src/components/RadioInfoForm.jsx

import React, { useState, useEffect } from "react";

// --- FUNÇÃO DE MÁSCARA ---
const applyPhoneMask = (value) => {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length <= 10) { // Telefone Fixo (XX) XXXX-XXXX
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6, 10)}`;
  } else { // Telemóvel (XX) XXXXX-XXXX
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
  }
};

function RadioInfoForm({ initialData, onSave }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const maskedValue = applyPhoneMask(value);
    setFormData((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      phonePrimary: `+55${(formData.phonePrimary || '').replace(/\D/g, '')}`,
      phoneWhatsapp: `+55${(formData.phoneWhatsapp || '').replace(/\D/g, '')}`,
    };
    onSave(dataToSend);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const displayPhonePrimary = applyPhoneMask(formData.phonePrimary);
  const displayPhoneWhatsapp = applyPhoneMask(formData.phoneWhatsapp);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* --- SEÇÃO DE IDENTIDADE DA RÁDIO --- */}
        <h2>Informações Gerais da Rádio</h2>
        <div className="form-group">
          <label>Nome da Rádio:</label>
          <input
            type="text"
            name="radioName"
            value={formData.radioName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Slogan:</label>
          <input
            type="text"
            name="slogan"
            value={formData.slogan || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>URL do Logótipo:</label>
          <input
            type="text"
            name="logoUrl"
            value={formData.logoUrl || ""}
            onChange={handleChange}
          />
        </div>

        {/* --- SEÇÃO MENSAGEM "FORA DO AR" --- */}
        <hr className="form-divider" />
        <h2>Mensagem "Fora do Ar"</h2>
        <div className="form-group">
          <label>Título (Ex: Retransmissão Via Satélite):</label>
          <input
            type="text"
            name="offAirTitle"
            value={formData.offAirTitle || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Subtítulo (Ex: A melhor programação para você):</label>
          <input
            type="text"
            name="offAirSubtitle"
            value={formData.offAirSubtitle || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>URL Imagem de Fundo (Fora do Ar):</label>
          <input
            type="text"
            name="offAirImageUrl"
            value={formData.offAirImageUrl || ""}
            onChange={handleChange}
          />
        </div>
        <hr className="form-divider" />

        {/* --- A CORREÇÃO ESTÁ AQUI: REMOVIDA A ESTRUTURA DE GRELHA --- */}
        <div>
          <h3>Endereço</h3>
          <div className="form-group">
            <label>Rua / Avenida:</label>
            <input
              type="text"
              name="addressStreet"
              value={formData.addressStreet || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Número:</label>
            <input
              type="text"
              name="addressNumber"
              value={formData.addressNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bairro:</label>
            <input
              type="text"
              name="addressNeighborhood"
              value={formData.addressNeighborhood || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Cidade:</label>
            <input
              type="text"
              name="addressCity"
              value={formData.addressCity || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Estado (UF):</label>
            <input
              type="text"
              name="addressState"
              value={formData.addressState || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>CEP:</label>
            <input
              type="text"
              name="addressZipCode"
              value={formData.addressZipCode || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <h3>Contactos</h3>
          <div className="form-group">
            <label>Telefone Principal:</label>
            <input
              type="text"
              name="phonePrimary"
              placeholder="(XX) XXXX-XXXX"
              value={displayPhonePrimary}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <label>WhatsApp:</label>
            <input
              type="text"
              name="phoneWhatsapp"
              placeholder="(XX) XXXXX-XXXX"
              value={displayPhoneWhatsapp}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <label>E-mail de Contacto:</label>
            <input
              type="email"
              name="emailContact"
              value={formData.emailContact || ""}
              onChange={handleChange}
            />
          </div>

          <h3>Redes Sociais</h3>
          <div className="form-group">
            <label>URL do Instagram:</label>
            <input
              type="text"
              name="socialInstagramUrl"
              value={formData.socialInstagramUrl || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>URL do Facebook:</label>
            <input
              type="text"
              name="socialFacebookUrl"
              value={formData.socialFacebookUrl || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>URL do YouTube:</label>
            <input
              type="text"
              name="socialYoutubeUrl"
              value={formData.socialYoutubeUrl || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>URL do X (Twitter):</label>
            <input
              type="text"
              name="socialXUrl"
              value={formData.socialXUrl || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <hr className="form-divider" />

        <button type="submit">Guardar Alterações</button>
      </form>
    </div>
  );
}

export default RadioInfoForm;