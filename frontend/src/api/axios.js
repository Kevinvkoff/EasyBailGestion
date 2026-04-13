import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

// INTERCEPTEUR DE REQUÊTE : Injecte le token Bearer
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    
    if (token) {
        // C'est ici que la magie opère pour éviter la 401
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// INTERCEPTEUR DE RÉPONSE : Gère les erreurs globales
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si le backend renvoie 401 (token expiré ou invalide)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
            // Optionnel : rediriger vers /login ou forcer un reload
            // window.location.reload(); 
        }
        return Promise.reject(error);
    }
);

export default axiosClient;