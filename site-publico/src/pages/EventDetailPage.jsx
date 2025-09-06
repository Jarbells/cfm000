// site-publico/src/pages/EventDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EventDetailPage() {
    // ... (useState e useEffect existentes) ...
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `/api/events/${id}`;
        
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


    // --- FUNÇÃO DE FORMATAÇÃO ATUALIZADA ---
    const formatDate = (startDateIso, finishDateIso) => {
        if (!startDateIso) return '';

        const startDate = new Date(startDateIso);
        const options = { dateStyle: 'full', timeStyle: 'short' };
        const formattedStartDate = new Intl.DateTimeFormat('pt-BR', options).format(startDate);

        if (!finishDateIso) {
            return formattedStartDate;
        }

        const finishDate = new Date(finishDateIso);
        const formattedFinishDate = new Intl.DateTimeFormat('pt-BR', options).format(finishDate);

        // Se o evento começar e terminar no mesmo dia, mostra a data uma vez
        if (startDate.toDateString() === finishDate.toDateString()) {
             return `${new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(startDate)} das ${new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(startDate)} às ${new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(finishDate)}`;
        }

        return `De ${formattedStartDate} a ${formattedFinishDate}`;
    };
    
    // ... (resto do componente) ...
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

                {/* --- EXIBIÇÃO DA DATA ATUALIZADA --- */}
                <div className="flex items-center text-gray-500 text-sm mb-8">
                    <span><b>Data:</b> {formatDate(event.eventDate, event.finishDate)}</span>
                </div>
                
                <img 
                    src={event.imageUrl || 'https://placehold.co/1200x675/181818/FFA500?text=Sem+Imagem'} 
                    alt={event.eventName}
                    className="w-full h-auto rounded-lg shadow-lg mb-8"
                />
                
                <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                    {event.description}
                </div>
            </article>
        </main>
    );
}

export default EventDetailPage;