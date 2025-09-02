// src/components/RadioPlayer.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'react-feather';

function RadioPlayer() {
  const streamUrl = 'https://stm2.stream2.com.br:8476/stream';
  const audioRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Estilos para a janela pop-up
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'sans-serif';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
  }, []);

  const handlePlayClick = () => {
    // Tenta tocar o áudio. O retorno é uma "Promise".
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // O áudio começou a tocar com sucesso.
        setUserInteracted(true);
      }).catch(error => {
        // O autoplay foi bloqueado, mas o clique do utilizador deve funcionar.
        console.error("Erro ao tentar tocar o áudio:", error);
        // Mesmo com erro, tentamos mostrar os controlos.
        setUserInteracted(true); 
      });
    }
  };

  return (
    <div>
      {/* O leitor de áudio está sempre aqui, mas é controlado pelo estado */}
      <audio 
        ref={audioRef} 
        src={streamUrl} 
        controls={userInteracted} // Só mostra os controlos após o clique
        autoPlay={userInteracted} // Só tenta o autoplay após o clique
        style={{ width: '100%', display: userInteracted ? 'block' : 'none' }} 
      />

      {/* O botão só aparece se o utilizador ainda não interagiu */}
      {!userInteracted && (
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handlePlayClick} 
            style={{ 
              background: '#FFA500', 
              border: 'none', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              cursor: 'pointer', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <Play size={40} color="#121212" />
          </button>
          <p style={{ marginTop: '10px' }}>Clique para ouvir</p>
        </div>
      )}
    </div>
  );
}

export default RadioPlayer;