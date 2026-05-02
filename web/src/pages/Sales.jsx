import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, DollarSign, TrendingUp, TrendingDown,
  Plus, Search, Filter, Download, Eye, Edit2, Trash2,
  Calendar, MapPin, Users, Package, CreditCard,
  CheckCircle, XCircle, Clock, FileText, BarChart3,
  ChevronDown, ChevronUp, Printer, Mail, Phone,
  User, Building2, Receipt, Truck
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  // Simulation des données de ventes
  useEffect(() => {
    const mockSales = [
      {
        id: 'SALE001',
        batchId: 'BATCH001',
        batchName: 'Bande A - Poulet de Chair',
        client: 'Restaurant La Perle',
        typeClient: 'professionnel',
        quantite: 150,
        prixUnitaire: 2500,
        montantTotal: 375000,
        dateVente: '2026-02-16',
        statut: 'livree',
        modePaiement: 'virement',
        datePaiement: '2026-02-16',
        livraison: 'programmee',
        adresseLivraison: 'Douala, Bonanjo',
        contact: '699123456',
        notes: 'Livraison prévue le 17/02',
        facture: 'FACT-2026-001'
      },
      {
        id: 'SALE002',
        batchId: 'BATCH004',
        batchName: 'Bande D - Standard',
        client: 'Supermarché Casino',
        typeClient: 'professionnel',
        quantite: 300,
        prixUnitaire: 2200,
        montantTotal: 660000,
        dateVente: '2026-02-15',
        statut: 'en_attente',
        modePaiement: 'cheque',
        datePaiement: null,
        livraison: 'en_attente',
        adresseLivraison: 'Douala, Akwa',
        contact: '699789012',
        notes: 'Paiement à réception',
        facture: 'FACT-2026-002'
      },
      {
        id: 'SALE003',
        batchId: 'BATCH001',
        batchName: 'Bande A - Poulet de Chair',
        client: 'Mme. Ngo B. (Particulier)',
        typeClient: 'particulier',
        quantite: 5,
        prixUnitaire: 2800,
        montantTotal: 14000,
        dateVente: '2026-02-16',
        statut: 'payee',
        modePaiement: 'especes',
        datePaiement: '2026-02-16',
        livraison: 'immediate',
        adresseLivraison: 'Douala, Makepe',
        contact: '699456789',
        notes: 'Client fidèle',
        facture: 'FACT-2026-003'
      },
      {
        id: 'SALE004',
        batchId: 'BATCH002',
        batchName: 'Bande B - Label Rouge',
        client: 'Hôtel Sawa',
        typeClient: 'professionnel',
        quantite: 80,
        prixUnitaire: 3500,
        montantTotal: 280000,
        dateVente: '2026-02-14',
        statut: 'livree',
        modePaiement: 'virement',
        datePaiement: '2026-02-15',
        livraison: 'livree',
        adresseLivraison: 'Douala, Bonapriso',
        contact: '699567890',
        notes: 'Commande urgente',
        facture: 'FACT-2026-004'
      },
      {
        id: 'SALE005',
        batchId: 'BATCH003',
        batchName: 'Bande C - Bio',
        client: 'Boucherie Moderne',
        typeClient: 'professionnel',
        quantite: 50,
        prixUnitaire: 3200,
        montantTotal: 160000,
        dateVente: '2026-02-13',
        statut: 'annulee',
        modePaiement: 'carte',
        datePaiement: null,
        livraison: 'annulee',
        adresseLivraison: 'Douala, Deido',
        contact: '699678901',
        notes: 'Annulé par le client',
        facture: 'FACT-2026-005'
      }
    ];

    setSales(mockSales);
    setLoading(false);
  }, []);

  const columns = [
    {
      key: 'batchName',
      label: 'Produit',
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            item.statut === 'livree' ? 'bg-green-100 text-green-600' :
            item.statut === 'en_attente' ? 'bg-amber-100 text-amber-600' :
            item.statut === 'payee' ? 'bg-blue-100 text-blue-600' :
            'bg-red-100 text-red-600'
          } dark:bg-opacity-20`}>
            <Package size={18} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.batchId}</p>
          </div>
        </div>
      )
    },
    {
      key: 'client',
      label: 'Client',
      sortable: true,
      render: (value, item) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Phone size={10} />
            {item.contact}
          </p>
        </div>
      )
    },
    {
      key: 'quantite',
      label: 'Quantité',
      sortable: true,
      render: (value) => `${value} sujets`
    },
    {
      key: 'prixUnitaire',
      label: 'Prix unitaire',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{value.toLocaleString()} FCFA</span>
      )
    },
    {
      key: 'montantTotal',
      label: 'Montant',
      sortable: true,
      render: (value) => (
        <span className="font-bold text-gray-900 dark:text-white">
          {value.toLocaleString()} FCFA
        </span>
      )
    },
    {
      key: 'dateVente',
      label: 'Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (value) => {
        const config = {
          livree: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-700 dark:text-green-400', label: 'Livrée' },
          payee: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-700 dark:text-blue-400', label: 'Payée' },
          en_attente: { bg: 'bg-amber-100 dark:bg-amber-900/50', text: 'text-amber-700 dark:text-amber-400', label: 'En attente' },
          annulee: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-700 dark:text-red-400', label: 'Annulée' }
        };
        const cfg = config[value] || config.en_attente;
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
            {cfg.label}
          </span>
        );
      }
    },
    {
      key: 'modePaiement',
      label: 'Paiement',
      render: (value) => (
        <div className="flex items-center gap-1">
          <CreditCard size={14} className="text-gray-400" />
          <span className="capitalize">{value}</span>
        </div>
      )
    }
  ];

  const calculateStats = () => {
    const total = sales.reduce((acc, s) => acc + s.montantTotal, 0);
    const paid = sales.filter(s => s.statut === 'payee' || s.statut === 'livree')
                       .reduce((acc, s) => acc + s.montantTotal, 0);
    const pending = sales.filter(s => s.statut === 'en_attente')
                        .reduce((acc, s) => acc + s.montantTotal, 0);
    const totalQuantity = sales.reduce((acc, s) => acc + s.quantite, 0);
    
    return { total, paid, pending, totalQuantity };
  };

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setShowDetailsModal(true);
  };

  const stats = calculateStats();

  const getPeriodData = () => {
    const now = new Date();
    const periods = {
      week: 7,
      month: 30,
      year: 365
    };
    
    const days = periods[filterPeriod] || 30;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    return sales.filter(s => new Date(s.dateVente) >= cutoff);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gestion des Ventes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Suivez et gérez toutes vos ventes et clients
          </p>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Printer size={20} />
            Rapport
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Nouvelle Vente
          </motion.button>
        </div>
      </motion.div>

      {/* Cartes de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Chiffre d'Affaires"
          value={stats.total.toLocaleString() + ' FCFA'}
          icon={DollarSign}
          trend="up"
          trendValue="15"
          color="purple"
        />
        <StatCard
          title="Ventes Payées"
          value={stats.paid.toLocaleString() + ' FCFA'}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="En Attente"
          value={stats.pending.toLocaleString() + ' FCFA'}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Sujets Vendus"
          value={stats.totalQuantity}
          icon={Package}
          color="blue"
        />
      </div>

      {/* Filtres de période */}
      <div className="flex flex-wrap gap-3">
        {[
          { value: 'week', label: 'Cette semaine' },
          { value: 'month', label: 'Ce mois' },
          { value: 'year', label: 'Cette année' }
        ].map((period) => (
          <button
            key={period.value}
            onClick={() => setFilterPeriod(period.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterPeriod === period.value
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Graphique des ventes */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Évolution des ventes
        </h3>
        <div className="h-64">
          {/* Intégration d'un graphique avec Recharts ici si nécessaire */}
          <div className="flex items-center justify-center h-full text-gray-400">
            Graphique des ventes à intégrer
          </div>
        </div>
      </div>

      {/* Tableau des ventes */}
      <DataTable
        title="Historique des Ventes"
        data={getPeriodData()}
        columns={columns}
        onView={handleViewDetails}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        searchable={true}
      />

      {/* Modal des détails de la vente */}
      <AnimatePresence>
        {showDetailsModal && selectedSale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Détails de la vente
                  </h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Facture */}
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Receipt size={24} />
                    <span className="text-sm opacity-90">{selectedSale.facture}</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">
                    {selectedSale.montantTotal.toLocaleString()} FCFA
                  </p>
                  <p className="text-sm opacity-90">
                    Date: {new Date(selectedSale.dateVente).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                {/* Informations client */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <User size={18} />
                    Client
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Nom</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedSale.client}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedSale.typeClient}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedSale.contact}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">client@email.com</p>
                    </div>
                  </div>
                </div>

                {/* Détails de la commande */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Package size={18} />
                    Détails de la commande
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Produit</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedSale.batchName}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Quantité</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedSale.quantite} sujets</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Prix unitaire</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedSale.prixUnitaire.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Montant total</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {selectedSale.montantTotal.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Livraison */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Truck size={18} />
                    Livraison
                  </h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-gray-900 dark:text-white">{selectedSale.adresseLivraison}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Statut: <span className="capitalize">{selectedSale.livraison}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedSale.notes && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
                    <p className="text-sm text-blue-600 dark:text-blue-400">{selectedSale.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                    <Printer size={18} />
                    Imprimer facture
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                    <Mail size={18} />
                    Envoyer au client
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sales;