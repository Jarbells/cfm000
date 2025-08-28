// src/pages/ManageEvents.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';
import AddEventForm from '../components/AddEventForm';
import EditEventForm from '../components/EditEventForm';

function ManageEvents() {
    const [eventItems, setEventItems] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = () => {
        // Lembre-se de adicionar @CrossOrigin no EventController!
        axios.get('http://localhost:8080/events?sort=eventDate,asc') // Busca os eventos mais próximos primeiro
            .then(response => {
                setEventItems(response.data.content);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os eventos!", error);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDeleteEvent = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            axios.delete(`http://localhost:8080/events/${id}`)
                .then(() => {
                    alert('Evento excluído com sucesso!');
                    fetchEvents();
                })
                .catch(error => {
                    alert('Erro ao excluir o evento.');
                    console.error("Houve um erro ao excluir o evento!", error);
                });
        }
    };

    const handleUpdateEvent = (id, updatedEvent) => {
        axios.put(`http://localhost:8080/events/${id}`, updatedEvent)
            .then(() => {
                alert('Evento atualizado com sucesso!');
                setEditingEvent(null);
                fetchEvents();
            })
            .catch(error => {
                alert('Erro ao atualizar o evento.');
                console.error("Houve um erro ao atualizar o evento!", error);
            });
    };

    const handleEditClick = (event) => {
        setEditingEvent(event);
    };

    const handleCancelEdit = () => {
        setEditingEvent(null);
    };

    return (
        <div>
            {editingEvent ? (
                <EditEventForm 
                    eventToEdit={editingEvent}
                    onUpdate={handleUpdateEvent}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <AddEventForm onEventAdded={fetchEvents} />
            )}
            <hr />
            <EventList 
                eventItems={eventItems}
                onDelete={handleDeleteEvent}
                onEdit={handleEditClick}
            />
        </div>
    );
}

export default ManageEvents;