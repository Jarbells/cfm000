// src/pages/EventDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `http://localhost:8080/events/${id}`;
        
        axios.get(apiUrl)
            .then(response => {
                setEvent(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar o detalhe do evento!", err);
                setError("Não foi possível carregar o evento.");
                setLoading(false);
            });
    }, [id]);

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(date);
    };
    
    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar evento...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-12 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                <Link to="/eventos" className="text-[#FFA500] hover:underline mb-8 inline-block">&larr; Voltar para todos os eventos</Link>
                
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{event.eventName}</h1>
                <p className="text-xl text-gray-400 mb-6"><b>Local:</b> {event.location}</p>

                <div className="flex items-center text-gray-500 text-sm mb-8">
                    <span><b>Data:</b> {formatDate(event.eventDate)}</span>
                </div>
                
                <img 
                    src={event.imageUrl || 'https://placehold.co/1200x675/181818/FFA500?text=Sem+Imagem'} 
                    alt={event.eventName}
                    className="w-full h-auto rounded-lg shadow-lg mb-8"
                />
                
                {/* A CORREÇÃO ESTÁ AQUI: Adicionámos a classe 'break-words' */}
                <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                    {event.description}
                </div>
            </article>
        </main>
    );
}

export default EventDetailPage;