// import React from 'react';

// const Health = () => {
//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Suivi Sanitaire</h2>
//       <p className="text-gray-600 dark:text-gray-300">Enregistrement de la mortalité et des vaccinations.</p>
//     </div>
//   );
// };

// export default Health;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulse, Syringe, Activity, AlertTriangle,
  Plus, Calendar, Droplets, Thermometer,
  FileText, Download, Filter, Search,
  CheckCircle, XCircle, Clock, Pill,
  Weight, Ruler, Eye, Edit2, Trash2,
  ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';
import SensorChart from '../components/SensorChart';

const Health = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVaccinationModal, setShowVaccinationModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  // Simulation des données sanitaires
  useEffect(() => {
    const mockHealthRecords = [
      {
        id: 'HEALTH001',
        batchId: 'BATCH001',
        batchName: 'Bande A - Poulet de Chair',
        date: '2026-02-16',
        type: 'examen',
        personnel: 'Dr. Kameni',
        mortaliteJour: 2,
        symptomes: ['Aucun'],
        traitement: 'Aucun',
        observations: 'État général excellent',
        prochaineVisite: '2026-02-23',
        alertes: []
      },
      {
        id: 'HEALTH002',
        batchId: 'BATCH002',
        batchName: 'Bande B - Label Rouge',
        date: '2026-02-16',
        type: 'urgence',
        personnel: 'Dr. Nganou',
        mortaliteJour: 8,
        symptomes: ['Toux', 'Abattement', 'Diarrhée'],
        traitement: 'Antibiotiques dans l\'eau',
        observations: 'Suspicion de maladie respiratoire',
        prochaineVisite: '2026-02-17',
        alertes: ['Urgence sanitaire', 'Taux de mortalité élevé']
      },
      {
        id: 'HEALTH003',
        batchId: 'BATCH003',
        batchName: 'Bande C - Bio',
        date: '2026-02-15',
        type: 'vaccination',
        personnel: 'Technicien Mbarga',
        mortaliteJour: 0,
        vaccin: 'Newcastle',
        dose: '2ml/sujet',
        observations: 'Vaccination réussie',
        prochaineVisite: '2026-03-01',
        alertes: []
      },
      {
        id: 'HEALTH004',
        batchId: 'BATCH004',
        batchName: 'Bande D - Standard',
        date: '2026-02-14',
        type: 'examen',
        personnel: 'Dr. Kameni',
        mortaliteJour: 5,
        symptomes: ['Légère toux'],
        traitement: 'Vitamines',
        observations: 'Surveillance recommandée',
        prochaineVisite: '2026-02-18',
        alertes: ['Surveillance requise']
      }
    ];

    const mockVaccinations = [
      {
        id: 'VACC001',
        batchId: 'BATCH001',
        batchName: 'Bande A - Poulet de Chair',
        datePrevue: '2026-02-20',
        dateReelle: null,
        typeVaccin: 'Newcastle',
        dose: '2ml',
        statut: 'planifie',
        responsable: 'Dr. Kameni'
      },
      {
        id: 'VACC002',
        batchId: 'BATCH002',
        batchName: 'Bande B - Label Rouge',
        datePrevue: '2026-02-18',
        dateReelle: null,
        typeVaccin: 'Gumboro',
        dose: '1.5ml',
        statut: 'planifie',
        responsable: 'Dr. Nganou'
      },
      {
        id: 'VACC003',
        batchId: 'BATCH003',
        batchName: 'Bande C - Bio',
        datePrevue: '2026-02-22',
        dateReelle: null,
        typeVaccin: 'Bronchite Infectieuse',
        dose: '2ml',
        statut: 'planifie',
        responsable: 'Technicien Mbarga'
      }
    ];

    setHealthRecords(mockHealthRecords);
    setVaccinations(mockVaccinations);
    setLoading(false);
  }, []);

  const columns = [
    {
      key: 'batchName',
      label: 'Bande',
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            item.type === 'urgence' ? 'bg-red-100 text-red-600' :
            item.type === 'vaccination' ? 'bg-green-100 text-green-600' :
            'bg-blue-100 text-blue-600'
          } dark:bg-opacity-20`}>
            {item.type === 'vaccination' ? <Syringe size={18} /> :
             item.type === 'urgence' ? <AlertTriangle size={18} /> :
             <HeartPulse size={18} />}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.batchId}</p>
          </div>
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => {
        const config = {
          examen: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-700 dark:text-blue-400', label: 'Examen' },
          vaccination: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-700 dark:text-green-400', label: 'Vaccination' },
          urgence: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-700 dark:text-red-400', label: 'Urgence' }
        };
        const cfg = config[value] || config.examen;
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
            {cfg.label}
          </span>
        );
      }
    },
    {
      key: 'personnel',
      label: 'Vétérinaire',
      sortable: true
    },
    {
      key: 'mortaliteJour',
      label: 'Mortalité (jour)',
      sortable: true,
      render: (value) => (
        <span className={value > 5 ? 'text-red-600 font-semibold' : 'text-gray-900 dark:text-white'}>
          {value}
        </span>
      )
    },
    {
      key: 'prochaineVisite',
      label: 'Prochaine visite',
      render: (value) => {
        const date = new Date(value);
        const today = new Date();
        const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        
        return (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span className={
              diffDays <= 1 ? 'text-red-600 font-semibold' :
              diffDays <= 3 ? 'text-amber-600' :
              'text-gray-900 dark:text-white'
            }>
              {value}
              {diffDays <= 1 && ' (Urgent)'}
            </span>
          </div>
        );
      }
    },
    {
      key: 'alertes',
      label: 'Alertes',
      render: (value) => (
        <div className="flex gap-1">
          {value && value.length > 0 ? (
            value.map((alert, index) => (
              <span key={index} className="w-2 h-2 bg-red-500 rounded-full" title={alert} />
            ))
          ) : (
            <span className="w-2 h-2 bg-green-500 rounded-full" title="Aucune alerte" />
          )}
        </div>
      )
    }
  ];

  const vaccinationColumns = [
    {
      key: 'batchName',
      label: 'Bande',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Syringe size={16} className="text-blue-500" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'datePrevue',
      label: 'Date prévue',
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'typeVaccin',
      label: 'Vaccin'
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'effectue' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
          value === 'planifie' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          {value === 'effectue' ? 'Effectué' : value === 'planifie' ? 'Planifié' : 'Annulé'}
        </span>
      )
    },
    {
      key: 'responsable',
      label: 'Responsable'
    }
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            Suivi Sanitaire
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Surveillance de la santé animale et gestion des vaccinations
          </p>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowVaccinationModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Syringe size={20} />
            Planifier Vaccination
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Nouvel Examen
          </motion.button>
        </div>
      </motion.div>

      {/* Cartes de KPIs sanitaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Examens (7j)"
          value={healthRecords.filter(r => {
            const date = new Date(r.date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return date >= weekAgo;
          }).length}
          icon={HeartPulse}
          color="blue"
        />
        <StatCard
          title="Vaccinations"
          value={vaccinations.length}
          icon={Syringe}
          color="green"
        />
        <StatCard
          title="Urgences"
          value={healthRecords.filter(r => r.type === 'urgence').length}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Bandes sous surveillance"
          value={healthRecords.filter(r => r.alertes && r.alertes.length > 0).length}
          icon={Activity}
          color="orange"
        />
        <StatCard
          title="Mortalité totale"
          value={healthRecords.reduce((acc, r) => acc + r.mortaliteJour, 0)}
          icon={AlertCircle}
          color="purple"
        />
      </div>

      {/* Graphique de suivi sanitaire */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SensorChart 
            data={[
              { time: 'Lun', mortalite: 2, consultations: 3, vaccinations: 1 },
              { time: 'Mar', mortalite: 5, consultations: 4, vaccinations: 2 },
              { time: 'Mer', mortalite: 3, consultations: 2, vaccinations: 0 },
              { time: 'Jeu', mortalite: 8, consultations: 5, vaccinations: 3 },
              { time: 'Ven', mortalite: 4, consultations: 3, vaccinations: 1 },
              { time: 'Sam', mortalite: 2, consultations: 1, vaccinations: 0 },
              { time: 'Dim', mortalite: 1, consultations: 0, vaccinations: 0 }
            ]} 
            type="area" 
            height={300} 
          />
        </div>

        {/* Alertes sanitaires */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Alertes sanitaires
          </h3>
          
          <div className="space-y-4">
            {healthRecords
              .filter(r => r.alertes && r.alertes.length > 0)
              .map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800"
                >
                  <p className="font-medium text-gray-900 dark:text-white">{record.batchName}</p>
                  {record.alertes.map((alerte, idx) => (
                    <p key={idx} className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {alerte}
                    </p>
                  ))}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(record.date).toLocaleDateString('fr-FR')}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Tableau des examens */}
      <DataTable
        title="Registre des Examens"
        data={healthRecords}
        columns={columns}
        onView={(item) => setSelectedRecord(item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        searchable={true}
      />

      {/* Tableau des vaccinations */}
      <DataTable
        title="Planning des Vaccinations"
        data={vaccinations}
        columns={vaccinationColumns}
        searchable={false}
      />

      {/* Modal des détails de l'examen */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedRecord(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Détails de l'examen
                  </h2>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bande</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedRecord.batchName}
                    </p>
                    <p className="text-sm text-gray-500">{selectedRecord.batchId}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(selectedRecord.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Vétérinaire</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedRecord.personnel}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">Mortalité du jour</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {selectedRecord.mortaliteJour} sujets
                    </p>
                  </div>

                  {selectedRecord.symptomes && selectedRecord.symptomes.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Symptômes observés</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecord.symptomes.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Traitement administré</p>
                    <p className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-900 dark:text-white">
                      {selectedRecord.traitement || 'Aucun'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Observations</p>
                    <p className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-900 dark:text-white">
                      {selectedRecord.observations}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Prochaine visite</p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {selectedRecord.prochaineVisite}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                      Modifier
                    </button>
                    <button className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors">
                      Signaler un problème
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Health;