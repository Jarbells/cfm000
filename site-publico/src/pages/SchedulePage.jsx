// src/pages/SchedulePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SchedulePage() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Buscamos todos os programas (a paginação padrão trará os primeiros)
        axios.get('http://localhost:8080/programas?sort=startTime,asc&size=100') // Aumentamos o size para garantir que vêm todos
            .then(response => {
                // A CORREÇÃO ESTÁ AQUI: Extraímos a lista de dentro da propriedade 'content'
                setPrograms(response.data.content);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar a grade de programação!", error);
                setLoading(false);
            });
    }, []);

    const formatTime = (time) => time ? time.substring(0, 5) : '';

    const groupedPrograms = programs.reduce((acc, program) => {
        const day = program.daysOfWeek;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(program);
        return acc;
    }, {});

    const dayOrder = [
        'Segunda a Sábado',
        'Segunda a Sexta',
        'Segunda a Quinta',
        'Sexta-Feira',
        'Sábado',
        'Domingo'
    ];

    const sortedDays = Object.keys(groupedPrograms).sort((a, b) => {
        return dayOrder.indexOf(a) - dayOrder.indexOf(b);
    });

    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar programação...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white mb-8 border-l-4 border-[#FFA500] pl-4">Nossa Programação</h1>
            
            <div className="space-y-10">
                {sortedDays.map(day => (
                    <div key={day}>
                        <h2 className="text-2xl font-bold text-[#FFA500] mb-4">{day}</h2>
                        <div className="bg-[#181818] rounded-lg shadow-lg">
                            {groupedPrograms[day].map((program, index) => (
                                <div key={program.id} className={`flex items-center p-4 ${index < groupedPrograms[day].length - 1 ? 'border-b border-gray-800' : ''}`}>
                                    <div className="w-32 text-lg font-bold text-white">
                                        {formatTime(program.startTime)} - {formatTime(program.endTime)}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-white">{program.name}</h3>
                                        <p className="text-gray-400 text-sm italic">
                                            {program.announcers.map(a => a.name).join(' & ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default SchedulePage;
