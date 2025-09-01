// src/components/OnAirSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OffAirDisplay = () => (
    <div className="relative z-20 p-4">
        <h2 className="text-lg font-semibold uppercase tracking-widest text-[#FFA500]">Cultura FM</h2>
        <h1 className="text-5xl md:text-6xl font-black my-2">Retransmissão Via Satélite</h1>
        <p className="text-xl text-gray-300">A melhor programação para você</p>
    </div>
);

function OnAirSection() {
    const [currentProgram, setCurrentProgram] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('https://placehold.co/1920x1080/121212/FFA500?text=Cultura+FM');
    const [imageIndex, setImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const findCurrentProgram = (programs) => {
        const now = new Date();
        const dayMap = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const currentDay = dayMap[now.getDay()];
        const currentTime = now.toTimeString().substring(0, 5);

        const activeProgram = programs.find(program => {
            const programDays = parseDaysOfWeek(program.daysOfWeek);
            if (!programDays.includes(currentDay)) {
                return false;
            }
            return currentTime >= program.startTime.substring(0, 5) && currentTime < program.endTime.substring(0, 5);
        });

        setCurrentProgram(activeProgram);
    };

    useEffect(() => {
        axios.get('/api/programas?size=100') // Busca todos os programas
            .then(response => {
                // A CORREÇÃO ESTÁ AQUI: Extraímos a lista de dentro da propriedade 'content'
                const allPrograms = response.data.content;
                findCurrentProgram(allPrograms);

                const intervalId = setInterval(() => findCurrentProgram(allPrograms), 60000); 
                return () => clearInterval(intervalId);
            })
            .catch(error => console.error("Erro ao buscar a grade de programação!", error));
    }, []);

    useEffect(() => {
        if (currentProgram && currentProgram.imageUrls && currentProgram.imageUrls.length > 0) {
            setBackgroundImage(currentProgram.imageUrls[imageIndex]);
            const imageIntervalId = setInterval(() => {
                setImageIndex(prevIndex => (prevIndex + 1) % currentProgram.imageUrls.length);
            }, 300000);
            return () => clearInterval(imageIntervalId);
        } else {
            setBackgroundImage('https://placehold.co/1920x1080/121212/FFA500?text=Cultura+FM');
        }
    }, [currentProgram, imageIndex]);

    useEffect(() => {
        if (currentProgram) {
            const updateProgress = () => {
                const now = new Date();
                const start = new Date(now.toDateString() + ' ' + currentProgram.startTime);
                const end = new Date(now.toDateString() + ' ' + currentProgram.endTime);
                
                if(end < start) end.setDate(end.getDate() + 1);

                const totalDuration = end - start;
                const elapsedTime = now - start;
                const currentProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
                
                setProgress(currentProgress);
            };

            updateProgress();
            const progressInterval = setInterval(updateProgress, 1000);
            return () => clearInterval(progressInterval);
        }
    }, [currentProgram]);

    return (
        <section className="relative h-96 flex items-center justify-center text-white text-center overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
            <img src={backgroundImage} alt="Imagem de fundo do programa no ar" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" />
            
            {currentProgram ? (
                <div className="relative z-20 p-4">
                    <h2 className="text-lg font-semibold uppercase tracking-widest text-[#FFA500]">No Ar Agora</h2>
                    <h1 className="text-5xl md:text-6xl font-black my-2">{currentProgram.name}</h1>
                    <p className="text-xl text-gray-300">
                        com {currentProgram.announcers.map(a => a.name).join(' & ')}
                    </p>
                    
                    <div className="w-full max-w-md mx-auto mt-6">
                        <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                            <span>{currentProgram.startTime.substring(0, 5)}</span>
                            <span>{currentProgram.endTime.substring(0, 5)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-[#FFA500] h-2.5 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <OffAirDisplay />
            )}
        </section>
    );
}

function parseDaysOfWeek(days) {
    const dayMap = {
        'segunda a sexta': ['seg', 'ter', 'qua', 'qui', 'sex'],
        'segunda a sábado': ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
        'segunda a quinta': ['seg', 'ter', 'qua', 'qui'],
        'sexta-feira': ['sex'],
        'sábado': ['sab'],
        'domingo': ['dom'],
    };
    const lowerDays = days.toLowerCase();
    return dayMap[lowerDays] || [];
}

export default OnAirSection;
