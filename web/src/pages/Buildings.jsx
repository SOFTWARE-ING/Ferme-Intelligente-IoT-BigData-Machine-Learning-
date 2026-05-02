import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Thermometer, Droplets, Wind, Activity,
  Plus, Search, Filter, Download, Eye, Edit2, Trash2,
  AlertCircle, CheckCircle, XCircle, Clock, Calendar,
  MapPin, Users, Egg, Gauge, Zap, Wifi,
  ChevronDown, ChevronUp, BarChart3, FileText
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';
import SensorChart from '../components/SensorChart';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Simulation des données des bâtiments
  useEffect(() => {
    const mockBuildings = [
      {
        id: 'BAT01',
        nom: 'Bâtiment A - Poulet de Chair',
        type: 'élevage',
        capacite: 600,
        effectifActuel: 585,
        temperature: 29.5,
        humidite: 68,
        ammoniac: 12,
        qualiteAir: 'bonne',
        statut: 'actif',
        responsable: 'Jean Mbarga',
        dernierMaintenance: '2026-02-10',
        prochaineMaintenance: '2026-03-10',
        alertes: [],
        equipements: ['Ventilation', 'Chauffage', 'Éclairage', 'Alimentation auto'],
        capteurs: ['Température', 'Humidité', 'Ammoniac', 'Densité']
      },
      {
        id: 'BAT02',
        nom: 'Bâtiment B - Label Rouge',
        type: 'élevage',
        capacite: 500,
        effectifActuel: 420,
        temperature: 30.2,
        humidite: 72,
        ammoniac: 15,
        qualiteAir: 'moyenne',
        statut: 'actif',
        responsable: 'Marie Nganou',
        dernierMaintenance: '2026-02-05',
        prochaineMaintenance: '2026-03-05',
        alertes: ["Taux d'ammoniac élevé"],
        equipements: ['Ventilation', 'Chauffage', 'Éclairage'],
        capteurs: ['Température', 'Humidité', 'Ammoniac']
      },
      {
        id: 'BAT03',
        nom: 'Bâtiment C - Quarantaine',
        type: 'quarantaine',
        capacite: 200,
        effectifActuel: 45,
        temperature: 28.0,
        humidite: 65,
        ammoniac: 8,
        qualiteAir: 'excellente',
        statut: 'actif',
        responsable: 'Dr. Kameni',
        dernierMaintenance: '2026-02-12',
        prochaineMaintenance: '2026-03-12',
        alertes: [],
        equipements: ['Ventilation', 'Chauffage', 'Isolation'],
        capteurs: ['Température', 'Humidité']
      },
      {
        id: 'BAT04',
        nom: 'Bâtiment D - Stockage',
        type: 'stockage',
        capacite: 300,
        effectifActuel: 0,
        temperature: 22.5,
        humidite: 55,
        ammoniac: 2,
        qualiteAir: 'excellente',
        statut: 'maintenance',
        responsable: 'Paul Atangana',
        dernierMaintenance: '2026-02-15',
        prochaineMaintenance: '2026-02-22',
        alertes: ['Maintenance en cours'],
        equipements: ['Ventilation', 'Éclairage'],
        capteurs: ['Température', 'Humidité']
      }
    ];

    // Simulation des données historiques des capteurs
    const mockSensorHistory = [];
    const now = new Date();
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 3600000);
      mockSensorHistory.push({
        time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        temperature: 28 + Math.random() * 4,
        humidite: 65 + Math.random() * 10,
        ammoniac: 10 + Math.random() * 8
      });
    }

    setBuildings(mockBuildings);
    setSensorHistory(mockSensorHistory);
    setLoading(false);
  }, []);

  const columns = [
    {
      key: 'nom',
      label: 'Bâtiment',
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            item.statut === 'actif' ? 'bg-green-100 text-green-600 dark:bg-green-900/50' :
            item.statut === 'maintenance' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50' :
            'bg-gray-100 text-gray-600 dark:bg-gray-700'
          }`}>
            <Building2 size={18} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.id}</p>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'élevage' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
          value === 'quarantaine' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'capacite',
      label: 'Capacité',
      sortable: true,
      render: (value, item) => (
        <div>
          <span className="font-medium">{item.effectifActuel}</span>
          <span className="text-xs text-gray-500 ml-1">/ {value}</span>
          <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div 
              className={`h-full rounded-full ${
                (item.effectifActuel / value) > 0.9 ? 'bg-red-500' :
                (item.effectifActuel / value) > 0.7 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${(item.effectifActuel / value) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'temperature',
      label: 'Température',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Thermometer size={14} className={value > 30 ? 'text-red-500' : value > 28 ? 'text-amber-500' : 'text-green-500'} />
          <span className={value > 30 ? 'text-red-600 font-semibold' : ''}>{value}°C</span>
        </div>
      )
    },
    {
      key: 'humidite',
      label: 'Humidité',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Droplets size={14} className={value > 75 ? 'text-blue-500' : 'text-green-500'} />
          <span>{value}%</span>
        </div>
      )
    },
    {
      key: 'ammoniac',
      label: 'Ammoniac',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Wind size={14} className={value > 15 ? 'text-red-500' : value > 10 ? 'text-amber-500' : 'text-green-500'} />
          <span className={value > 15 ? 'text-red-600 font-semibold' : ''}>{value} ppm</span>
        </div>
      )
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (value) => {
        const config = {
          actif: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
          maintenance: { bg: 'bg-amber-100 dark:bg-amber-900/50', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
          inactif: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-400', dot: 'bg-gray-500' }
        };
        const cfg = config[value] || config.actif;
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
              {value}
            </span>
          </div>
        );
      }
    },
    {
      key: 'responsable',
      label: 'Responsable',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Users size={14} className="text-gray-400" />
          <span>{value}</span>
        </div>
      )
    }
  ];

  const handleViewDetails = (building) => {
    setSelectedBuilding(building);
    setShowDetailsModal(true);
  };

  const getSensorStatus = (value, type) => {
    const thresholds = {
      temperature: { warning: 28, critical: 30 },
      humidite: { warning: 70, critical: 80 },
      ammoniac: { warning: 10, critical: 15 }
    };
    
    const t = thresholds[type];
    if (!t) return 'normal';
    
    if (value >= t.critical) return 'critical';
    if (value >= t.warning) return 'warning';
    return 'normal';
  };

  const getStatusColor = (status) => {
    const colors = {
      normal: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      warning: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/30'
    };
    return colors[status] || colors.normal;
  };

  const filteredBuildings = filterStatus === 'all'
    ? buildings
    : buildings.filter(b => b.statut === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600 animate-pulse" />
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Gestion des Bâtiments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Surveillance IoT en temps réel des conditions d'élevage
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          Nouveau Bâtiment
        </motion.button>
      </motion.div>

      {/* Cartes de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Bâtiments Actifs"
          value={buildings.filter(b => b.statut === 'actif').length}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Capacité Totale"
          value={buildings.reduce((acc, b) => acc + b.capacite, 0)}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Température Moy."
          value={(buildings.reduce((acc, b) => acc + b.temperature, 0) / buildings.length).toFixed(1) + '°C'}
          icon={Thermometer}
          color="red"
        />
        <StatCard
          title="Humidité Moy."
          value={Math.round(buildings.reduce((acc, b) => acc + b.humidite, 0) / buildings.length) + '%'}
          icon={Droplets}
          color="blue"
        />
        <StatCard
          title="Alertes Actives"
          value={buildings.filter(b => b.alertes.length > 0).length}
          icon={AlertCircle}
          color="orange"
        />
      </div>

      {/* Filtres rapides */}
      <div className="flex flex-wrap gap-3">
        {['all', 'actif', 'maintenance', 'inactif'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterStatus === status
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {status === 'all' ? 'Tous' : 
             status === 'actif' ? 'Actifs' :
             status === 'maintenance' ? 'Maintenance' : 'Inactifs'}
          </button>
        ))}
      </div>

      {/* Graphique en temps réel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SensorChart 
            data={sensorHistory} 
            type="area" 
            height={300}
            showBrush={true}
          />
        </div>

        {/* État des capteurs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Wifi className="text-blue-500" size={20} />
            État des Capteurs
          </h3>
          
          <div className="space-y-4">
            {buildings.map((building) => (
              <motion.div
                key={building.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">{building.nom}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    building.statut === 'actif' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {building.statut}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <div className={`text-xs font-medium ${getSensorStatus(building.temperature, 'temperature') === 'critical' ? 'text-red-600' : 'text-gray-500'}`}>
                      🌡️ {building.temperature}°C
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-medium ${getSensorStatus(building.humidite, 'humidite') === 'critical' ? 'text-red-600' : 'text-gray-500'}`}>
                      💧 {building.humidite}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-medium ${getSensorStatus(building.ammoniac, 'ammoniac') === 'critical' ? 'text-red-600' : 'text-gray-500'}`}>
                      💨 {building.ammoniac}ppm
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tableau des bâtiments */}
      <DataTable
        title="Liste des Bâtiments"
        data={filteredBuildings}
        columns={columns}
        onView={handleViewDetails}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        searchable={true}
      />

      {/* Modal des détails du bâtiment */}
      <AnimatePresence>
        {showDetailsModal && selectedBuilding && (
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
              {/* En-tête avec statut */}
              <div className={`p-6 bg-gradient-to-r ${
                selectedBuilding.statut === 'actif' ? 'from-blue-600 to-cyan-600' :
                selectedBuilding.statut === 'maintenance' ? 'from-amber-600 to-orange-600' :
                'from-gray-600 to-gray-700'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedBuilding.nom}</h2>
                    <div className="flex items-center gap-4 text-white/90">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {selectedBuilding.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {selectedBuilding.effectifActuel} / {selectedBuilding.capacite} sujets
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Dernière maintenance: {selectedBuilding.dernierMaintenance}
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

              {/* Contenu */}
              <div className="p-6 space-y-6">
                {/* Conditions actuelles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <Thermometer size={20} className="text-red-500" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        getSensorStatus(selectedBuilding.temperature, 'temperature')
                      }`}>
                        {getSensorStatus(selectedBuilding.temperature, 'temperature') === 'critical' ? 'Critique' :
                         getSensorStatus(selectedBuilding.temperature, 'temperature') === 'warning' ? 'Attention' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBuilding.temperature}°C
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Température</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <Droplets size={20} className="text-blue-500" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        getSensorStatus(selectedBuilding.humidite, 'humidite')
                      }`}>
                        {getSensorStatus(selectedBuilding.humidite, 'humidite') === 'critical' ? 'Critique' :
                         getSensorStatus(selectedBuilding.humidite, 'humidite') === 'warning' ? 'Attention' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBuilding.humidite}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Humidité</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <Wind size={20} className="text-purple-500" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        getSensorStatus(selectedBuilding.ammoniac, 'ammoniac')
                      }`}>
                        {getSensorStatus(selectedBuilding.ammoniac, 'ammoniac') === 'critical' ? 'Critique' :
                         getSensorStatus(selectedBuilding.ammoniac, 'ammoniac') === 'warning' ? 'Attention' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBuilding.ammoniac} ppm
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ammoniac</p>
                  </div>
                </div>

                {/* Graphique des dernières 24h */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Évolution des dernières 24h
                  </h3>
                  <SensorChart data={sensorHistory} type="line" height={200} showBrush={false} />
                </div>

                {/* Équipements et capteurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Zap size={18} className="text-amber-500" />
                      Équipements
                    </h4>
                    <div className="space-y-2">
                      {selectedBuilding.equipements.map((eq, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{eq}</span>
                          <CheckCircle size={16} className="text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Gauge size={18} className="text-blue-500" />
                      Capteurs IoT
                    </h4>
                    <div className="space-y-2">
                      {selectedBuilding.capteurs.map((cap, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{cap}</span>
                          <Wifi size={16} className="text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alertes */}
                {selectedBuilding.alertes.length > 0 && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <AlertCircle size={18} />
                      Alertes actives
                    </h4>
                    {selectedBuilding.alertes.map((alerte, index) => (
                      <p key={index} className="text-sm text-red-600 dark:text-red-300">
                        • {alerte}
                      </p>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                    <FileText size={18} />
                    Rapport complet
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                    <BarChart3 size={18} />
                    Analyses détaillées
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

export default Buildings;