// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRadioInfo } from '../contexts/RadioInfoContext.jsx';

function Header() {
  const radioInfo = useRadioInfo();

  const radioNameParts = radioInfo?.radioName?.split(' ') || ['Rádio', 'FM'];
  const firstWord = radioNameParts[0];
  const restOfName = radioNameParts.slice(1).join(' ');

  return (
    // Ajuste no padding vertical para equilibrar com o novo tamanho do logo
    <header className="bg-[#181818] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center gap-3">
          {radioInfo?.logoUrl && (
            // AQUI ESTÁ A MUDANÇA: h-8 para h-10
            <img src={radioInfo.logoUrl} alt="Logótipo da Rádio" className="h-24" />
          )}
          {!radioInfo?.logoUrl && (
            <span>
              <span className="text-[#FFA500]">{firstWord}</span> {restOfName}
            </span>
          )}
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Início</Link>
          <Link to="/programacao" className="text-gray-300 hover:text-white transition duration-300">Programação</Link>
          <Link to="/noticias" className="text-gray-300 hover:text-white transition duration-300">Notícias</Link>
          <Link to="/eventos" className="text-gray-300 hover:text-white transition duration-300">Eventos</Link>
          <Link to="/equipe" className="text-gray-300 hover:text-white transition duration-300">Equipe</Link>
          <Link to="/contato" className="text-gray-300 hover:text-white transition duration-300">Contato</Link>
        </nav>
        <a href="#" className="bg-[#FFA500] text-black font-bold py-2 px-5 rounded-full hover:bg-orange-400 transition duration-300 transform hover:scale-105">
          Ouça Ao Vivo
        </a>
      </div>
    </header>
  );
}

export default Header;