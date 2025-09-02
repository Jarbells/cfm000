// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RadioInfoProvider } from './contexts/RadioInfoContext.jsx';

// Importação dos componentes de layout
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Importação de todas as páginas
import HomePage from './pages/HomePage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import NewsListPage from './pages/NewsListPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import EventsListPage from './pages/EventsListPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import RadioPlayer from './components/RadioPlayer.jsx';

// Componente para o Layout Principal do Site
const MainLayout = ({ children }) => (
  <RadioInfoProvider>
    <div className="bg-[#121212] text-gray-200 font-sans">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  </RadioInfoProvider>
);

function App() {
  return (
    <Routes>
      {/* Rota para o leitor de rádio (sem layout) */}
      <Route path="/player" element={<RadioPlayer />} />

      {/* Rotas para o site principal (com layout) */}
      <Route path="/*" element={
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programacao" element={<SchedulePage />} />
            <Route path="/noticias" element={<NewsListPage />} />
            <Route path="/noticias/:id" element={<NewsDetailPage />} />
            <Route path="/eventos" element={<EventsListPage />} />
            <Route path="/eventos/:id" element={<EventDetailPage />} />
            <Route path="/equipe" element={<TeamPage />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>
        </MainLayout>
      } />
    </Routes>
  );
}

export default App;