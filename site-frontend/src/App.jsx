// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ManageLocutores from './pages/ManageLocutores';
import ManagePrograms from './pages/ManagePrograms';
import ManageNews from './pages/ManageNews';
import ManageEvents from './pages/ManageEvents';
import ManageRadioInfo from './pages/ManageRadioInfo';
import ManageSponsors from './pages/ManageSponsors';
import './App.css'; // Importa os estilos do layout principal

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div>
                <h1>Bem-vindo ao Painel</h1>
                <p>Selecione uma opção no menu à esquerda para começar.</p>
              </div>
            } />
            <Route path="/locutores" element={<ManageLocutores />} />
            <Route path="/programas" element={<ManagePrograms />} />
            <Route path="/noticias" element={<ManageNews />} />
            <Route path="/eventos" element={<ManageEvents />} />
            <Route path="/informacoes" element={<ManageRadioInfo />} />
            <Route path="/patrocinadores" element={<ManageSponsors />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;