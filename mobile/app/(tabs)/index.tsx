import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '@/components/StatCard';
import SensorChart from '@/components/SensorChart';
import DataTable from '@/components/DataTable';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

// Utilitaire pour générer une variation réaliste autour d'une valeur précédente
function jitter(prev: number, spread: number, min: number, max: number): number {
  const next = prev + (Math.random() - 0.5) * spread;
  return Math.max(min, Math.min(max, next));
}

// Valeurs initiales de référence pour chaque capteur
const INITIAL_VALUES = {
  temperature: 28.5,
  humidite: 67,
  ammoniac: 12,
  densite: 20,
};

export default function Dashboard() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [refreshing, setRefreshing] = useState(false);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [liveValues, setLiveValues] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(true);

  // useRef pour garder les dernières valeurs entre les ticks sans redéclencher l'effet
  const prevValues = useRef(INITIAL_VALUES);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Génère un point de données en partant des valeurs précédentes (variation progressive)
  const generateTick = () => {
    const prev = prevValues.current;

    const newTemp  = jitter(prev.temperature, 0.8,  24, 36);
    const newHum   = jitter(prev.humidite,    2.0,  50, 90);
    const newAmm   = jitter(prev.ammoniac,    1.2,   5, 22);
    const newDens  = jitter(prev.densite,     0.5,  15, 25);

    const updated = {
      temperature: newTemp,
      humidite:    newHum,
      ammoniac:    newAmm,
      densite:     newDens,
    };

    prevValues.current = updated;

    const now = new Date();
    const timeLabel = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newPoint = { time: timeLabel, ...updated };

    // Mise à jour du graphique (sliding window de 20 points)
    setSensorData(prev => {
      const next = [...prev, newPoint];
      return next.length > 20 ? next.slice(next.length - 20) : next;
    });

    // Mise à jour des stat cards
    setLiveValues(updated);

    // Mise à jour des alertes selon les seuils
    setAlerts(buildAlerts(newTemp, newAmm));

    setLoading(false);
  };

  // Construit la liste d'alertes dynamiquement selon les valeurs capteurs
  const buildAlerts = (temp: number, amm: number) => {
    const list: any[] = [];

    if (amm > 16) {
      list.push({
        id: 1,
        type: 'critical',
        message: `Taux d'ammoniac critique — ${amm.toFixed(1)} ppm (Bâtiment B)`,
        time: 'À l\'instant',
      });
    } else if (amm > 13) {
      list.push({
        id: 1,
        type: 'warning',
        message: `Ammoniac élevé — ${amm.toFixed(1)} ppm (Bâtiment B)`,
        time: 'À l\'instant',
      });
    }

    if (temp > 31) {
      list.push({
        id: 2,
        type: 'critical',
        message: `Température critique — ${temp.toFixed(1)}°C (Bâtiment A)`,
        time: 'À l\'instant',
      });
    } else if (temp > 29.5) {
      list.push({
        id: 2,
        type: 'warning',
        message: `Température élevée — ${temp.toFixed(1)}°C (Bâtiment A)`,
        time: 'À l\'instant',
      });
    }

    if (list.length < 3) {
      list.push({
        id: 3,
        type: 'info',
        message: 'Vaccination programmée demain — Bâtiment C',
        time: 'Dans 24h',
      });
    }

    return list;
  };

  // Démarre le flux de données en temps réel
  const startLiveStream = () => {
    generateTick(); // premier tick immédiat
    intervalRef.current = setInterval(generateTick, 3000); // puis toutes les 3s
  };

  const stopLiveStream = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startLiveStream();
    return () => stopLiveStream(); // nettoyage au démontage du composant
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Réinitialise les valeurs au centre pour repartir proprement
    prevValues.current = INITIAL_VALUES;
    stopLiveStream();
    setTimeout(() => {
      startLiveStream();
      setRefreshing(false);
    }, 800);
  };

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
      label: 'Âge (j)',
      sortable: true,
      render: (value: number) => <Text style={{ color: theme.text }}>{value} j</Text>,
    },
    {
      key: 'mortalite',
      label: 'Mortalité (%)',
      sortable: true,
      render: (value: number) => (
        <Text style={{ color: value > 3 ? '#EF4444' : '#10B981', fontWeight: '600' }}>
          {value}%
        </Text>
      ),
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (value: string) => {
        const colors: Record<string, string> = {
          en_croissance: '#10B981',
          quarantaine:   '#EF4444',
          vaccination:   '#3B82F6',
          vendue:        '#6B7280',
        };
        const labels: Record<string, string> = {
          en_croissance: 'En croissance',
          quarantaine:   'Quarantaine',
          vaccination:   'Vaccination',
          vendue:        'Vendue',
        };
        return (
          <View style={[styles.badge, { backgroundColor: (colors[value] || colors.en_croissance) + '20' }]}>
            <Text style={[styles.badgeText, { color: colors[value] || colors.en_croissance }]}>
              {labels[value] || value}
            </Text>
          </View>
        );
      },
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#EF4444';
      case 'warning':  return '#F59E0B';
      case 'info':     return '#3B82F6';
      default:         return '#6B7280';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return 'alert-circle';
      case 'warning':  return 'warning';
      default:         return 'information-circle';
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Tableau de Bord</Text>
          <Text style={[styles.headerSubtitle, { color: theme.tabIconDefault }]}>
            Surveillance en temps réel
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: '#10B98120' }]}>
          <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
          <Text style={{ color: '#10B981', fontSize: 12, fontWeight: '600' }}>En ligne</Text>
        </View>
      </View>

      {/* Stat Cards — valeurs live */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsRow}>
          <StatCard
            title="Température"
            value={`${liveValues.temperature.toFixed(1)}°C`}
            icon="thermometer-outline"
            trend={liveValues.temperature > INITIAL_VALUES.temperature ? 'up' : 'down'}
            trendValue={Math.abs(liveValues.temperature - INITIAL_VALUES.temperature).toFixed(1)}
            color="red"
          />
          <StatCard
            title="Humidité"
            value={`${liveValues.humidite.toFixed(0)}%`}
            icon="water-outline"
            trend={liveValues.humidite > INITIAL_VALUES.humidite ? 'up' : 'down'}
            trendValue={Math.abs(liveValues.humidite - INITIAL_VALUES.humidite).toFixed(1)}
            color="blue"
          />
          <StatCard
            title="Ammoniac"
            value={`${liveValues.ammoniac.toFixed(1)} ppm`}
            icon="cloud-outline"
            trend={liveValues.ammoniac > INITIAL_VALUES.ammoniac ? 'up' : 'down'}
            trendValue={Math.abs(liveValues.ammoniac - INITIAL_VALUES.ammoniac).toFixed(1)}
            color="orange"
          />
          <StatCard
            title="Production"
            value="1,950"
            icon="trending-up-outline"
            trend="up"
            trendValue="12"
            color="green"
          />
        </View>
      </ScrollView>

      {/* Sensor Chart — se met à jour automatiquement via sensorData */}
      <SensorChart data={sensorData} />

      {/* Alertes dynamiques */}
      <View style={[styles.alertsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.alertsHeader}>
          <Ionicons name="warning-outline" size={20} color={Colors.light.warning} />
          <Text style={[styles.alertsTitle, { color: theme.text }]}>Alertes en cours</Text>
        </View>

        {alerts.map((alert) => (
          <View key={alert.id} style={[styles.alertItem, { borderBottomColor: theme.border }]}>
            <View style={[styles.alertIcon, { backgroundColor: getAlertColor(alert.type) + '20' }]}>
              <Ionicons
                name={getAlertIcon(alert.type) as any}
                size={18}
                color={getAlertColor(alert.type)}
              />
            </View>
            <View style={styles.alertContent}>
              <Text style={[styles.alertMessage, { color: theme.text }]}>{alert.message}</Text>
              <Text style={[styles.alertTime, { color: theme.tabIconDefault }]}>{alert.time}</Text>
            </View>
          </View>
        ))}

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Text style={[styles.quickStatValue, { color: theme.text }]}>3</Text>
            <Text style={[styles.quickStatLabel, { color: theme.tabIconDefault }]}>Bâtiments actifs</Text>
          </View>
          <View style={styles.quickStatItem}>
            <Text style={[styles.quickStatValue, { color: theme.text }]}>4</Text>
            <Text style={[styles.quickStatLabel, { color: theme.tabIconDefault }]}>Bandes en cours</Text>
          </View>
          <View style={styles.quickStatItem}>
            <Text style={[styles.quickStatValue, { color: theme.text }]}>1,950</Text>
            <Text style={[styles.quickStatLabel, { color: theme.tabIconDefault }]}>Sujets totaux</Text>
          </View>
          <View style={styles.quickStatItem}>
            <Text style={[styles.quickStatValue, { color: theme.text }]}>2.3%</Text>
            <Text style={[styles.quickStatLabel, { color: theme.tabIconDefault }]}>Mortalité moy.</Text>
          </View>
        </View>
      </View>

      {/* Data Table */}
      <DataTable
        title="Bandes de Production Actives"
        data={batchData}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        searchable={true}
      />

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statsScroll: {
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 16,
  },
  alertsCard: {
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
  },
  alertTime: {
    fontSize: 12,
    marginTop: 2,
  },
  quickStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickStatItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  quickStatLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});