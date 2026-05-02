// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Tableau de Bord</h2>
//       <p className="text-gray-600 dark:text-gray-300">Bienvenue sur le tableau de bord de gestion intelligente de ManiChicks.</p>
//       {/* Ici viendront les graphiques et KPI */}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, Droplets, Wind, Activity, 
  TrendingUp, AlertTriangle, Clock, Users,
  Egg, DollarSign, Calendar, MapPin
} from 'lucide-react';
import StatCard from '../components/StatCard';
import SensorChart from '../components/SensorChart';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulation de données en temps réel
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const data = [];
      
      // Générer 24 points de données (1 par heure)
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000);
        data.push({
          time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          temperature: 28 + Math.random() * 5,
          humidite: 65 + Math.random() * 15,
          ammoniac: 10 + Math.random() * 8,
          densite: 18 + Math.random() * 4
        });
      }
      
      setSensorData(data);
      
      // Générer quelques alertes
      setAlerts([
        {
          id: 1,
          type: 'warning',
          message: 'Température élevée dans le bâtiment A',
          time: 'Il y a 5 min',
          icon: Thermometer
        },
        {
          id: 2,
          type: 'critical',
          message: "Taux d'ammoniac critique - Bâtiment B",
          time: 'Il y a 12 min',
          icon: Wind
        },
        {
          id: 3,
          type: 'info',
          message: 'Vaccination programmée demain',
          time: 'Dans 24h',
          icon: Calendar
        }
      ]);
      
      setLoading(false);
    };

    generateData();
    const interval = setInterval(generateData, 30000); // Mise à jour toutes les 30 secondes
    
    return () => clearInterval(interval);
  }, []);

  // Données simulées pour les lots
  const batchData = [
    { id: 1, nom: 'BANDE001', batiment: 'BAT01', effectif: 580, age: 25, mortalite: 2.3, statut: 'en_croissance' },
    { id: 2, nom: 'BANDE002', batiment: 'BAT02', effectif: 420, age: 18, mortalite: 1.8, statut: 'en_croissance' },
    { id: 3, nom: 'BANDE003', batiment: 'BAT01', effectif: 600, age: 32, mortalite: 3.1, statut: 'quarantaine' },
    { id: 4, nom: 'BANDE004', batiment: 'BAT03', effectif: 350, age: 12, mortalite: 1.2, statut: 'vaccination' },
  ];

  const columns = [
    { key: 'nom', label: 'Bande', sortable: true },
    { key: 'batiment', label: 'Bâtiment', sortable: true },
    { key: 'effectif', label: 'Effectif', sortable: true },
    { 
      key: 'age', 
      label: 'Âge (jours)', 
      sortable: true,
      render: (value) => `${value} jours`
    },
    { 
      key: 'mortalite', 
      label: 'Mortalité (%)', 
      sortable: true,
      render: (value) => (
        <span className={value > 3 ? 'text-red-600 font-semibold' : 'text-green-600'}>
          {value}%
        </span>
      )
    },
    { 
      key: 'statut', 
      label: 'Statut',
      render: (value) => {
        const colors = {
          en_croissance: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
          quarantaine: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400',
          vaccination: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
          vendue: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[value] || colors.en_croissance}`}>
            {value.replace('_', ' ')}
          </span>
        );
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Egg className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec bienvenue */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tableau de Bord Intelligent
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Surveillance en temps réel de votre ferme avicole
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Système opérationnel
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
              Douala, Cameroun
            </span>
          </div>
        </div>
      </motion.div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Température Moyenne"
          value="28.5°C"
          icon={Thermometer}
          trend="up"
          trendValue="2.5"
          color="red"
        />
        <StatCard
          title="Humidité"
          value="67%"
          icon={Droplets}
          trend="down"
          trendValue="1.2"
          color="blue"
        />
        <StatCard
          title="Taux d'Ammoniac"
          value="12 ppm"
          icon={Wind}
          trend="up"
          trendValue="5.8"
          color="orange"
        />
        <StatCard
          title="Production Totale"
          value="1,950"
          icon={TrendingUp}
          trend="up"
          trendValue="12"
          color="green"
        />
      </div>

      {/* Graphiques et Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique principal - 2 colonnes */}
        <div className="lg:col-span-2">
          <SensorChart data={sensorData} type="area" height={400} showBrush={true} />
        </div>

        {/* Alertes et notifications - 1 colonne */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={20} />
            Alertes en cours
          </h3>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: alert.id * 0.1 }}
                className={`p-4 rounded-xl ${
                  alert.type === 'critical' 
                    ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
                    : alert.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'
                    : 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'critical'
                      ? 'bg-red-100 dark:bg-red-900/50 text-red-600'
                      : alert.type === 'warning'
                      ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600'
                      : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'
                  }`}>
                    <alert.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {alert.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicateurs rapides */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Bâtiments actifs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Bandes en cours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,950</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sujets totaux</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mortalité moy.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tableau des lots en cours */}
      <DataTable
        title="Bandes de Production Actives"
        data={batchData}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        searchable={true}
      />
    </div>
  );
};

export default Dashboard;