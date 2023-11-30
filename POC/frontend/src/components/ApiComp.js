import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiCaller = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/data');
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        // Appeler la fonction asynchrone
        fetchData();
    }, []); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois lors du montage du composant

    return (
        <div>
            <h2>Résultat de l'appel API :</h2>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>{error ? `Erreur : ${error.message}` : 'Chargement en cours...'}</p>
            )}
        </div>
    );
};

export default ApiCaller;
