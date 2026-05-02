import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, Plus, Search, Filter, Download,
  Eye, Edit2, Trash2, ChevronDown, ChevronUp,
  Calendar, MapPin, Users, Thermometer, Droplets,
  AlertCircle, CheckCircle, Clock, Activity,
  Egg, Syringe, XCircle, FileText, BarChart3,
  Truck
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Simulation de données des bandes
  useEffect(() => {
    const mockBatches = [
      {
        id: 'BATCH001',
        nom: 'Bande A - Poulet de Chair',
        fournisseur: 'AgriChick Supplier',
        dateInstallation: '2026-02-01',
        batiments: ['Bâtiment A', 'Bâtiment B'],
        effectifInitial: 1000,
        effectifActuel: 985,
        age: 15,
        poidsMoyen: 0.85,
        mortalite: 1.5,
        statut: 'en_croissance',
        sante: 'excellente',
        prochaineVaccination: '2026-02-20',
        consommationAliment: 125.5,
        consommationEau: 280.3,
        temperatureMoyenne: 29.5,
        humiditeMoyenne: 68,
        alerts: []
      },
      {
        id: 'BATCH002',
        nom: 'Bande B - Label Rouge',
        fournisseur: 'Ferme du Sud',
        dateInstallation: '2026-01-15',
        batiments: ['Bâtiment C'],
        effectifInitial: 800,
        effectifActuel: 765,
        age: 32,
        poidsMoyen: 2.1,
        mortalite: 4.4,
        statut: 'quarantaine',
        sante: 'surveillance',
        prochaineVaccination: '2026-02-18',
        consommationAliment: 210.8,
        consommationEau: 450.2,
        temperatureMoyenne: 30.2,
        humiditeMoyenne: 72,
        alerts: ['Taux de mortalité élevé', 'Température instable']
      },
      {
        id: 'BATCH003',
        nom: 'Bande C - Bio',
        fournisseur: 'BioPoulet SARL',
        dateInstallation: '2026-02-10',
        batiments: ['Bâtiment A', 'Bâtiment D'],
        effectifInitial: 600,
        effectifActuel: 598,
        age: 6,
        poidsMoyen: 0.32,
        mortalite: 0.3,
        statut: 'demarrage',
        sante: 'excellente',
        prochaineVaccination: '2026-02-22',
        consommationAliment: 45.2,
        consommationEau: 98.5,
        temperatureMoyenne: 32.0,
        humiditeMoyenne: 65,
        alerts: []
      },
      {
        id: 'BATCH004',
        nom: 'Bande D - Standard',
        fournisseur: 'AgriChick Supplier',
        dateInstallation: '2026-01-05',
        batiments: ['Bâtiment B'],
        effectifInitial: 1200,
        effectifActuel: 1120,
        age: 42,
        poidsMoyen: 2.8,
        mortalite: 6.7,
        statut: 'pret_vente',
        sante: 'bonne',
        prochaineVaccination: 'Terminé',
        consommationAliment: 450.3,
        consommationEau: 890.6,
        temperatureMoyenne: 28.5,
        humiditeMoyenne: 70,
        alerts: ['Prêt pour la vente']
      }
    ];

    setBatches(mockBatches);
    setLoading(false);
  }, []);

  const columns = [
    { 
      key: 'nom', 
      label: 'Bande', 
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            item.statut === 'en_croissance' ? 'bg-green-100 text-green-600 dark:bg-green-900/50' :
            item.statut === 'quarantaine' ? 'bg-red-100 text-red-600 dark:bg-red-900/50' :
            item.statut === 'pret_vente' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50' :
            'bg-gray-100 text-gray-600 dark:bg-gray-700'
          }`}>
            <Egg size={18} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.id}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'fournisseur', 
      label: 'Fournisseur', 
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-gray-400" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'dateInstallation', 
      label: 'Installation', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    { 
      key: 'effectifActuel', 
      label: 'Effectif', 
      sortable: true,
      render: (value, item) => (
        <div>
          <span className="font-medium">{value}</span>
          <span className="text-xs text-gray-500 ml-1">/ {item.effectifInitial}</span>
        </div>
      )
    },
    { 
      key: 'age', 
      label: 'Âge (jours)', 
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-400" />
          <span>{value} j</span>
        </div>
      )
    },
    { 
      key: 'mortalite', 
      label: 'Mortalité', 
      sortable: true,
      render: (value) => (
        <span className={value > 5 ? 'text-red-600 font-semibold' : value > 3 ? 'text-amber-600' : 'text-green-600'}>
          {value}%
        </span>
      )
    },
    { 
      key: 'statut', 
      label: 'Statut',
      render: (value) => {
        const config = {
          en_croissance: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-700 dark:text-green-400', label: 'En croissance' },
          quarantaine: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-700 dark:text-red-400', label: 'Quarantaine' },
          demarrage: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-700 dark:text-blue-400', label: 'Démarrage' },
          pret_vente: { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-700 dark:text-purple-400', label: 'Prêt vente' }
        };
        const cfg = config[value] || config.en_croissance;
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
            {cfg.label}
          </span>
        );
      }
    },
    { 
      key: 'sante', 
      label: 'Santé',
      render: (value) => {
        const icons = {
          excellente: <CheckCircle size={14} className="text-green-500" />,
          bonne: <Activity size={14} className="text-blue-500" />,
          surveillance: <AlertCircle size={14} className="text-amber-500" />
        };
        return (
          <div className="flex items-center gap-1">
            {icons[value]}
            <span className="capitalize">{value}</span>
          </div>
        );
      }
    }
  ];

  const handleViewDetails = (batch) => {
    setSelectedBatch(batch);
    setShowDetailsModal(true);
  };

  const getStatusColor = (statut) => {
    const colors = {
      en_croissance: 'from-green-500 to-emerald-600',
      quarantaine: 'from-red-500 to-rose-600',
      demarrage: 'from-blue-500 to-cyan-600',
      pret_vente: 'from-purple-500 to-violet-600'
    };
    return colors[statut] || 'from-gray-500 to-gray-600';
  };

  const filteredBatches = filterStatus === 'all' 
    ? batches 
    : batches.filter(b => b.statut === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Egg className="w-8 h-8 text-green-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec statistiques */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Gestion des Bandes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Suivez et gérez toutes vos bandes de production
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          Nouvelle Bande
        </motion.button>
      </motion.div>

      {/* Cartes de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Bandes Actives"
          value={batches.length}
          icon={Factory}
          color="green"
        />
        <StatCard
          title="Effectif Total"
          value={batches.reduce((acc, b) => acc + b.effectifActuel, 0)}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Mortalité Moy."
          value={(batches.reduce((acc, b) => acc + b.mortalite, 0) / batches.length).toFixed(1) + '%'}
          icon={Activity}
          color="red"
        />
        <StatCard
          title="Âge Moyen"
          value={Math.round(batches.reduce((acc, b) => acc + b.age, 0) / batches.length) + ' jours'}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="En Quarantaine"
          value={batches.filter(b => b.statut === 'quarantaine').length}
          icon={AlertCircle}
          color="orange"
        />
      </div>

      {/* Filtres rapides */}
      <div className="flex flex-wrap gap-3">
        {['all', 'en_croissance', 'demarrage', 'quarantaine', 'pret_vente'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterStatus === status
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {status === 'all' ? 'Toutes' : 
             status === 'en_croissance' ? 'En croissance' :
             status === 'demarrage' ? 'Démarrage' :
             status === 'quarantaine' ? 'Quarantaine' : 'Prêt vente'}
          </button>
        ))}
      </div>

      {/* Tableau des bandes */}
      <DataTable
        title="Liste des Bandes de Production"
        data={filteredBatches}
        columns={columns}
        onView={handleViewDetails}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        searchable={true}
      />

      {/* Modal des détails de la bande */}
      <AnimatePresence>
        {showDetailsModal && selectedBatch && (
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
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête du modal */}
              <div className={`p-6 bg-gradient-to-r ${getStatusColor(selectedBatch.statut)}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedBatch.nom}</h2>
                    <div className="flex items-center gap-4 text-white/90">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {selectedBatch.batiments.join(', ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Installée le {new Date(selectedBatch.dateInstallation).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Contenu du modal */}
              <div className="p-6 space-y-6">
                {/* Stats principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Effectif</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBatch.effectifActuel}
                      <span className="text-sm font-normal text-gray-500 ml-1">/ {selectedBatch.effectifInitial}</span>
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Âge</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBatch.age} jours</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Poids Moyen</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBatch.poidsMoyen} kg</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mortalité</p>
                    <p className={`text-2xl font-bold ${
                      selectedBatch.mortalite > 5 ? 'text-red-600' : 
                      selectedBatch.mortalite > 3 ? 'text-amber-600' : 'text-green-600'
                    }`}>
                      {selectedBatch.mortalite}%
                    </p>
                  </div>
                </div>

                {/* Conditions environnementales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Thermometer className="text-red-500" size={20} />
                      Conditions d'élevage
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">Température moyenne</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedBatch.temperatureMoyenne}°C
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">Humidité moyenne</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedBatch.humiditeMoyenne}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">Consommation alimentaire</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedBatch.consommationAliment} kg/jour
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">Consommation d'eau</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedBatch.consommationEau} L/jour
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Calendrier des soins */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Syringe className="text-blue-500" size={20} />
                      Prochains soins
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Prochaine vaccination</p>
                        <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                          {selectedBatch.prochaineVaccination}
                        </p>
                      </div>
                      
                      {selectedBatch.alerts.length > 0 && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                          <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">Alertes actives</p>
                          {selectedBatch.alerts.map((alert, index) => (
                            <div key={index} className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                              <AlertCircle size={14} />
                              <span className="text-sm">{alert}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                    <FileText size={18} />
                    Rapport complet
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                    <BarChart3 size={18} />
                    Analyses
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

export default Batches;