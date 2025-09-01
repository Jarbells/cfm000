// src/components/EventSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventSection() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const apiUrl = '/api/events?page=0&size=3&sort=eventDate,asc';
        axios.get(apiUrl)
            .then(response => { setEvents(response.data.content); })
            .catch(error => { console.error("Houve um erro ao buscar os eventos!", error); });
    }, []);

    const formatDateBox = (isoString) => {
        if (!isoString) return { day: '??', month: '???' };
        const date = new Date(isoString);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date).replace('.', '');
        return { day, month };
    };

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-[#FFA500] pl-4">Próximos Eventos</h2>
            <div className="space-y-6">
                {events.map(event => (
                    <div key={event.id} className="bg-[#181818] rounded-lg p-4 flex items-center space-x-4 transition duration-300 hover:bg-[#282828]">
                        
                        {/* ESTA É A PARTE QUE FALTAVA */}
                        <div className="bg-[#FFA500] text-black text-center rounded-md p-2 w-20 flex-shrink-0">
                            <span className="block text-3xl font-bold">{formatDateBox(event.eventDate).day}</span>
                            <span className="block text-sm uppercase font-semibold">{formatDateBox(event.eventDate).month}</span>
                        </div>
                        
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-white">{event.eventName}</h3>
                            <p className="text-gray-400 text-sm">{event.location}</p>
                        </div>
                        <Link to={`/eventos/${event.id}`} className="text-[#FFA500] font-semibold hover:underline flex-shrink-0">
                            Ver detalhes
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default EventSection;