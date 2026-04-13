import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosClient from '../api/axios';
import {
    Users, Wallet, Clock, Home, Settings, Building2, 
    Loader2, Plus, Save, X as CloseIcon, Menu, LogOut
} from 'lucide-react';

/**
 * COMPOSANT AUXILIAIRE : NavItem
 * Doit être défini pour que le Dashboard puisse l'afficher
 */
function NavItem({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm cursor-pointer transition-all border-none outline-none ${
                active 
                ? 'bg-[#1e5d40] text-white shadow-md' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
        >
            {icon} {label}
        </button>
    );
}

export default function Dashboard({ onLogout }) {
    const isMounted = useRef(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const [statsData, setStatsData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [landlord, setLandlord] = useState({ name: "Chargement...", id: "EB-...", email: "" });
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: "", email: "" });
    
    const [leaseForm, setLeaseForm] = useState({
        locataire_name: '',
        loyer_montant: '',
        bien_id: '',
        date_debut: new Date().toISOString().split('T')[0],
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    // Nettoyage au démontage
    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('ACCESS_TOKEN');
        if (onLogout) onLogout();
    }, [onLogout]);

    const fetchDashboardData = useCallback(async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
            handleLogout();
            return;
        }

        setLoading(true);
        try {
            const results = await Promise.allSettled([
                axiosClient.get('/dashboard/stats'),
                axiosClient.get('/dashboard/transactions'),
                axiosClient.get('/user-profile')
            ]);

            if (!isMounted.current) return;

            const statsRes = results[0].status === 'fulfilled' ? results[0].value.data : null;
            const transRes = results[1].status === 'fulfilled' ? results[1].value.data : [];
            const userRes = results[2].status === 'fulfilled' ? results[2].value.data : null;

            setStatsData([
                { label: 'Revenus Mensuels', value: formatCurrency(statsRes?.revenue), icon: Wallet, color: 'text-emerald-600' },
                { label: 'Locataires Actifs', value: statsRes?.tenants_count || 0, icon: Users, color: 'text-blue-600' },
                { label: 'Paiements en Retard', value: formatCurrency(statsRes?.overdue), icon: Clock, color: 'text-rose-600' },
            ]);

            setTransactions(Array.isArray(transRes) ? transRes : []);
            
            if (userRes) {
                const userData = {
                    name: userRes.name || "Propriétaire",
                    id: `EB-${userRes.id?.toString().padStart(3, '0') || 'PRO'}`,
                    email: userRes.email || ""
                };
                setLandlord(userData);
                setProfileForm({ name: userData.name, email: userData.email });
            }
        } catch (error) {
            console.error("Erreur Dashboard:", error);
        } finally {
            if (isMounted.current) setLoading(false);
        }
    }, [handleLogout]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleCreateLease = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const dataToLaravel = {
                locataire_name: leaseForm.locataire_name,
                bien_nom: "Appartement Standard", 
                montant_loyer: leaseForm.loyer_montant, 
                statut: 'payé',
                date_debut: leaseForm.date_debut
            };

            await axiosClient.post('/bails', dataToLaravel);
            
            setLeaseForm({ 
                locataire_name: '', 
                loyer_montant: '', 
                bien_id: '', 
                date_debut: new Date().toISOString().split('T')[0] 
            });
            setActiveTab('dashboard');
            fetchDashboardData(); 
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de la création du bail");
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await axiosClient.put('/user-profile', profileForm);
            // On suppose que Laravel renvoie { user: { name, email } }
            const updatedUser = res.data.user || res.data;
            setLandlord(prev => ({ ...prev, name: updatedUser.name, email: updatedUser.email }));
            setIsEditing(false);
            alert("Profil mis à jour !");
        } catch (error) {
            alert("Erreur lors de la mise à jour");
        } finally {
            setIsSaving(false);
        }
    };

    // Écran de chargement
    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-4">
            <Loader2 className="animate-spin text-[#1e5d40] mb-4" size={40} />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">Chargement d'EasyBail...</p>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden relative">
            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* ASIDE / SIDEBAR */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 p-6 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-12 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1e5d40] rounded-xl flex items-center justify-center text-white font-black shadow-lg">EB</div>
                        <span className="font-black text-xl tracking-tighter uppercase text-[#1e5d40]">EasyBail</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} />
                    <NavItem icon={<Users size={20} />} label="Locataires" active={activeTab === 'locataires'} onClick={() => { setActiveTab('locataires'); setIsSidebarOpen(false); }} />
                    <NavItem icon={<Building2 size={20} />} label="Mes Biens" active={activeTab === 'biens'} onClick={() => { setActiveTab('biens'); setIsSidebarOpen(false); }} />
                    <NavItem icon={<Settings size={20} />} label="Paramètres" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
                </nav>

                <div className="mt-auto pt-6 border-t">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 text-rose-600 font-black text-xs uppercase hover:bg-rose-50 rounded-2xl transition-all border-none">
                        <LogOut size={18} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 h-full overflow-y-auto">
                <div className="p-4 lg:p-10 max-w-7xl mx-auto">
                    
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <button className="lg:hidden p-3 bg-white border rounded-xl" onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
                            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 capitalize tracking-tight">
                                {activeTab === 'dashboard' ? "Vue d'ensemble" : activeTab.replace('-', ' ')}
                            </h1>
                        </div>
                        
                        <button 
                            onClick={() => setActiveTab('nouveau-bail')}
                            className="w-full sm:w-auto bg-[#1e5d40] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-lg flex items-center justify-center gap-2 border-none"
                        >
                            <Plus size={18} /> Nouveau Bail
                        </button>
                    </header>

                    {/* VUES DYNAMIQUES */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {statsData.map((item, index) => (
                                    <div key={index} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-transform hover:scale-[1.01]">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                                            <item.icon size={22} className={item.color} />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                        <h2 className="text-2xl lg:text-3xl font-black mt-1 text-slate-900">{item.value}</h2>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-50">
                                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Transactions Récentes</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <tbody className="divide-y divide-slate-50">
                                            {transactions.length > 0 ? transactions.map(t => (
                                                <tr key={t.id} className="hover:bg-slate-50/50">
                                                    <td className="px-8 py-5 font-bold text-slate-800">{t.locataire}</td>
                                                    <td className="px-8 py-5 font-black text-center">{formatCurrency(t.montant)}</td>
                                                    <td className="px-8 py-5 text-right font-black text-[10px] text-[#1e5d40] uppercase tracking-widest">{t.statut}</td>
                                                </tr>
                                            )) : (
                                                <tr><td className="p-10 text-center text-slate-400 font-bold uppercase text-xs">Aucune activité récente</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'nouveau-bail' && (
                        <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-8 lg:p-10 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900">Enregistrer un bail</h2>
                                <button onClick={() => setActiveTab('dashboard')} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 border-none bg-transparent">
                                    <CloseIcon size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleCreateLease} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nom du locataire</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={leaseForm.locataire_name}
                                        onChange={(e) => setLeaseForm({...leaseForm, locataire_name: e.target.value})}
                                        className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e5d40]/20 font-bold border-none" 
                                        placeholder="Ex: Perpétue ..."
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Loyer Mensuel ($)</label>
                                        <input 
                                            required
                                            type="number" 
                                            value={leaseForm.loyer_montant}
                                            onChange={(e) => setLeaseForm({...leaseForm, loyer_montant: e.target.value})}
                                            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e5d40]/20 font-bold border-none" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Date de début</label>
                                        <input 
                                            type="date" 
                                            value={leaseForm.date_debut}
                                            onChange={(e) => setLeaseForm({...leaseForm, date_debut: e.target.value})}
                                            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e5d40]/20 font-bold border-none" 
                                        />
                                    </div>
                                </div>
                                <button 
                                    disabled={isSaving}
                                    type="submit" 
                                    className="w-full bg-[#1e5d40] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 border-none"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : "Enregistrer le Bail"}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="max-w-xl mx-auto bg-white rounded-[32px] p-8 lg:p-10 border border-slate-100 shadow-sm">
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-24 h-24 bg-[#1e5d40] rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 uppercase">
                                    {landlord.name.substring(0, 2)}
                                </div>
                                <h2 className="text-xl font-black text-slate-900">{landlord.name}</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{landlord.id}</p>
                            </div>
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Nom Complet</label>
                                    <input 
                                        disabled={!isEditing}
                                        value={profileForm.name} 
                                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} 
                                        className="w-full mt-2 rounded-2xl py-4 px-6 bg-slate-50 border-none font-bold disabled:opacity-70 focus:ring-2 focus:ring-[#1e5d40]/20 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4">Email</label>
                                    <input 
                                        disabled={!isEditing}
                                        value={profileForm.email} 
                                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} 
                                        className="w-full mt-2 rounded-2xl py-4 px-6 bg-slate-50 border-none font-bold disabled:opacity-70 focus:ring-2 focus:ring-[#1e5d40]/20 outline-none" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsEditing(!isEditing)} 
                                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all border-none ${isEditing ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-white hover:opacity-90'}`}
                                    >
                                        {isEditing ? 'Annuler' : 'Modifier le profil'}
                                    </button>
                                    {isEditing && (
                                        <button disabled={isSaving} type="submit" className="w-full bg-[#1e5d40] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 shadow-lg border-none">
                                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Sauvegarder</>}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}