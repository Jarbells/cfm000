// src/pages/ManageNews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from '../components/NewsList';
import AddNewsForm from '../components/AddNewsForm';
import EditNewsForm from '../components/EditNewsForm';

function ManageNews() {
    const [newsItems, setNewsItems] = useState([]);
    const [editingNews, setEditingNews] = useState(null);

    const fetchNews = () => {
        axios.get('http://localhost:8080/news?sort=publicationDate,desc')
            .then(response => {
                setNewsItems(response.data.content);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar as notícias!", error);
            });
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDeleteNews = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
            axios.delete(`http://localhost:8080/news/${id}`)
                .then(() => {
                    alert('Notícia excluída com sucesso!');
                    fetchNews();
                })
                .catch(error => {
                    alert('Erro ao excluir a notícia.');
                    console.error("Houve um erro ao excluir a notícia!", error);
                });
        }
    };

    const handleUpdateNews = (id, updatedNews) => {
        axios.put(`http://localhost:8080/news/${id}`, updatedNews)
            .then(() => {
                alert('Notícia atualizada com sucesso!');
                setEditingNews(null);
                fetchNews();
            })
            .catch(error => {
                alert('Erro ao atualizar a notícia.');
                console.error("Houve um erro ao atualizar a notícia!", error);
            });
    };

    const handleEditClick = (news) => {
        setEditingNews(news);
    };

    const handleCancelEdit = () => {
        setEditingNews(null);
    };

    return (
        <div>
            {editingNews ? (
                <EditNewsForm 
                    newsToEdit={editingNews}
                    onUpdate={handleUpdateNews}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <AddNewsForm onNewsAdded={fetchNews} />
            )}
            <hr />
            <NewsList 
                newsItems={newsItems}
                onDelete={handleDeleteNews}
                onEdit={handleEditClick}
            />
        </div>
    );
}

export default ManageNews;