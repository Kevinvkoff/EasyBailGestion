import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axios';
import {
    Users, Wallet, Clock, Home, FileText, Settings, Building2, Loader2, Plus, Save, X as CloseIcon
} from 'lucide-react';

export default function Dashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [landlord, setLandlord] = useState({ name: "Utilisateur", id: "EB-...", email: "" });
    
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: "", email: "" });

    const fetchDashboardData = useCallback(async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        
        // Si pas de token, on arrête le loading et on déconnecte
        if (!token) {
            setLoading(false);
            onLogout();
            return;
        }

        setLoading(true);
        try {
            // allSettled permet de ne pas tout bloquer si une route backend manque
            const results = await Promise.allSettled([
                axiosClient.get('/dashboard/stats'),
                axiosClient.get('/dashboard/transactions'),
                axiosClient.get('/user-profile')
            ]);

            // Extraction des résultats
            const statsRes = results[0].status === 'fulfilled' ? results[0].value.data : null;
            const transRes = results[1].status === 'fulfilled' ? results[1].value.data : [];
            const userRes = results[2].status === 'fulfilled' ? results[2].value.data : null;

            // Mise à jour des stats (avec valeurs par défaut si erreur)
            setStatsData([
                { label: 'Revenus Mensuels', value: `${statsRes?.revenue || 0}$`, icon: Wallet, color: 'text-emerald-600' },
                { label: 'Locataires Actifs', value: statsRes?.tenants_count || 0, icon: Users, color: 'text-blue-600' },
                { label: 'Paiements en Retard', value: `${statsRes?.overdue || 0}$`, icon: Clock, color: 'text-rose-600' },
            ]);

            setTransactions(Array.isArray(transRes) ? transRes : []);
            
            if (userRes) {
                const userData = {
                    name: userRes.name || "Propriétaire",
                    id: userRes.landlord_id || "EB-PRO",
                    email: userRes.email || ""
                };
                setLandlord(userData);
                setProfileForm({ name: userData.name, email: userData.email });
            }

            // Si le profil renvoie une 401 malgré la présence du token local
            if (results[2].status === 'rejected' && results[2].reason.response?.status === 401) {
                onLogout();
            }

        } catch (error) {
            console.error("Erreur critique Dashboard:", error);
        } finally {
            // Quoi qu'il arrive, on retire l'écran de chargement
            setLoading(false);
        }
    }, [onLogout]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put('/user-profile', profileForm);
            setLandlord(prev => ({ ...prev, name: profileForm.name, email: profileForm.email }));
            setIsEditing(false);
        } catch (error) {
            alert("Erreur lors de la mise à jour");
        }
    };

    const getStatusStyles = (statut) => {
        const s = statut?.toLowerCase() || '';
        if (s.includes('payé')) return "bg-emerald-50 text-emerald-700 border border-emerald-100";
        if (s.includes('attente')) return "bg-amber-50 text-amber-700 border border-amber-100";
        return "bg-rose-50 text-rose-700 border border-rose-100";
    };

    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
            <Loader2 className="animate-spin text-[#1e5d40] mb-4" size={40} />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Initialisation d'EasyBail...</p>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
            <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-[#1e5d40] rounded-xl flex items-center justify-center text-white font-black shadow-lg">EB</div>
                    <span className="font-black text-xl tracking-tighter uppercase">EasyBail</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <NavItem icon={<Users size={20} />} label="Locataires" active={activeTab === 'locataires'} onClick={() => setActiveTab('locataires')} />
                    <NavItem icon={<Building2 size={20} />} label="Mes Biens" active={activeTab === 'biens'} onClick={() => setActiveTab('biens')} />
                    <NavItem icon={<FileText size={20} />} label="Contrats" active={activeTab === 'contrats'} onClick={() => setActiveTab('contrats')} />
                    <NavItem icon={<Settings size={20} />} label="Paramètres" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>

                <div className="mt-auto pt-6 border-t">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all" onClick={onLogout}>
                        <div className="w-10 h-10 bg-[#1e5d40] rounded-full flex items-center justify-center text-white font-bold">
                            {landlord.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden text-left">
                            <p className="text-sm font-black truncate">{landlord.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{landlord.id}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{activeTab}</h1>
                    <button 
                        onClick={() => setActiveTab('nouveau-bail')}
                        className="bg-[#1e5d40] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                    >
                        <Plus size={18} /> Nouveau Bail
                    </button>
                </header>

                {activeTab === 'dashboard' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {statsData.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-[#1e5d40]">
                                        <item.icon size={22} className={item.color} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                    <h2 className="text-3xl font-black mt-1 text-slate-900">{item.value}</h2>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Dernières Activités</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                        <tr>
                                            <th className="px-8 py-4">Locataire</th>
                                            <th className="px-8 py-4 text-center">Montant</th>
                                            <th className="px-8 py-4 text-right">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {transactions.length > 0 ? transactions.map(t => (
                                            <tr key={t.id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-5 font-bold text-slate-800">{t.locataire}</td>
                                                <td className="px-8 py-5 font-black text-center">{t.montant}$</td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${getStatusStyles(t.statut)}`}>
                                                        {t.statut}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-10 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">Aucune transaction</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-xl mx-auto bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm animate-in slide-in-from-bottom-4">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <div className="relative group">
                                <div className="w-32 h-32 bg-[#1e5d40] rounded-full flex items-center justify-center text-white text-4xl font-black border-4 border-white shadow-xl">
                                    {landlord.name.substring(0, 2).toUpperCase()}
                                </div>
                                <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-[#1e5d40]">
                                    <Plus size={18} />
                                </button>
                            </div>
                            <h2 className="mt-6 text-2xl font-black text-slate-900">{landlord.name}</h2>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{landlord.id}</p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Nom complet</label>
                                <input 
                                    disabled={!isEditing}
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                    className={`w-full mt-2 rounded-2xl py-4 px-6 font-bold text-slate-700 outline-none transition-all ${isEditing ? 'bg-white border-2 border-[#1e5d40]/20' : 'bg-slate-50 border-none opacity-60'}`}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Email de contact</label>
                                <input 
                                    disabled={!isEditing}
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                                    className={`w-full mt-2 rounded-2xl py-4 px-6 font-bold text-slate-700 outline-none transition-all ${isEditing ? 'bg-white border-2 border-[#1e5d40]/20' : 'bg-slate-50 border-none opacity-60'}`}
                                />
                            </div>

                            <div className="pt-6">
                                {!isEditing ? (
                                    <button type="button" onClick={() => setIsEditing(true)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-colors">Modifier le profil</button>
                                ) : (
                                    <div className="flex gap-4">
                                        <button type="submit" className="flex-1 bg-[#1e5d40] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-colors"><Save size={18}/> Sauver</button>
                                        <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"><CloseIcon size={18}/> Annuler</button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <div onClick={onClick} className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm cursor-pointer transition-all ${active ? 'bg-[#1e5d40] text-white shadow-lg shadow-emerald-900/10' : 'text-slate-400 hover:bg-slate-50'}`}>
            {icon}
            {label}
        </div>
    );
}