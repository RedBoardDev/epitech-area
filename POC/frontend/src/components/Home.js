import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Home = () => {
    const { isAuthenticated, verifyToken, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // const checkAuthentication = async () => {
        //     try {
        //         const isAuthenticated = await verifyToken();
        //         if (!isAuthenticated) {
        //             navigate('/login');
        //         }
        //     } catch (error) {
        //         console.error('Error checking authentication:', error);
        //         navigate('/login');
        //     }
        // };

        // checkAuthentication();
    }, [verifyToken, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <h2>Page d'Accueil</h2>
                    {/* Contenu de la page d'accueil */}
                    <button onClick={handleLogout}>Se Déconnecter</button>
                </div>
            )}
        </div>
    );
};

export default Home;
