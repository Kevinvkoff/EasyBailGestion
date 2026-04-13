import React, { useState } from 'react';
import axiosClient from '../api/axiosClient'; // Ton instance bien configurée

const AddTenant = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse_actuelle: '',
        piece_identite: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axiosClient.post('/tenants', formData);
            alert(`Le locataire ${response.data.nom} a été ajouté avec succès !`);
            
            // Réinitialiser le formulaire
            setFormData({
                nom: '', prenom: '', email: '', 
                telephone: '', adresse_actuelle: '', piece_identite: ''
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error.response?.data);
            alert("Une erreur est survenue lors de l'enregistrement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouveau Locataire</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Adresse actuelle</label>
                    <input type="text" name="adresse_actuelle" value={formData.adresse_actuelle} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">N° Pièce d'identité</label>
                    <input type="text" name="piece_identite" value={formData.piece_identite} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow">
                        {loading ? 'Enregistrement...' : 'Ajouter le locataire'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTenant;