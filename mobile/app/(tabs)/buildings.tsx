import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '@/components/StatCard';
import SensorChart from '@/components/SensorChart';
import DataTable from '@/components/DataTable';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function Buildings() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [buildings, setBuildings] = useState<any[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [sensorHistory, setSensorHistory] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockBuildings = [
      { id: 'BAT01', nom: 'Bâtiment A - Poulet de Chair', type: 'élevage', capacite: 600, effectifActuel: 585, temperature: 29.5, humidite: 68, ammoniac: 12, qualiteAir: 'bonne', statut: 'actif', responsable: 'Jean Mbarga', dernierMaintenance: '2026-02-10', prochaineMaintenance: '2026-03-10', alertes: [], equipements: ['Ventilation', 'Chauffage', 'Éclairage', 'Alimentation auto'], capteurs: ['Température', 'Humidité', 'Ammoniac', 'Densité'] },
      { id: 'BAT02', nom: 'Bâtiment B - Label Rouge', type: 'élevage', capacite: 500, effectifActuel: 420, temperature: 30.2, humidite: 72, ammoniac: 15, qualiteAir: 'moyenne', statut: 'actif', responsable: 'Marie Nganou', dernierMaintenance: '2026-02-05', prochaineMaintenance: '2026-03-05', alertes: ["Taux d'ammoniac élevé"], equipements: ['Ventilation', 'Chauffage', 'Éclairage'], capteurs: ['Température', 'Humidité', 'Ammoniac'] },
      { id: 'BAT03', nom: 'Bâtiment C - Quarantaine', type: 'quarantaine', capacite: 200, effectifActuel: 45, temperature: 28.0, humidite: 65, ammoniac: 8, qualiteAir: 'excellente', statut: 'actif', responsable: 'Dr. Kameni', dernierMaintenance: '2026-02-12', prochaineMaintenance: '2026-03-12', alertes: [], equipements: ['Ventilation', 'Chauffage', 'Isolation'], capteurs: ['Température', 'Humidité'] },
      { id: 'BAT04', nom: 'Bâtiment D - Stockage', type: 'stockage', capacite: 300, effectifActuel: 0, temperature: 22.5, humidite: 55, ammoniac: 2, qualiteAir: 'excellente', statut: 'maintenance', responsable: 'Paul Atangana', dernierMaintenance: '2026-02-15', prochaineMaintenance: '2026-02-22', alertes: ['Maintenance en cours'], equipements: ['Ventilation', 'Éclairage'], capteurs: ['Température', 'Humidité'] },
    ];

    const mockSensorHistory = [];
    const now = new Date();
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 3600000);
      mockSensorHistory.push({
        time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        temperature: 28 + Math.random() * 4,
        humidite: 65 + Math.random() * 10,
        ammoniac: 10 + Math.random() * 8,
      });
    }

    setBuildings(mockBuildings);
    setSensorHistory(mockSensorHistory);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  };

  const filteredBuildings = filterStatus === 'all' ? buildings : buildings.filter(b => b.statut === filterStatus);

  const columns = [
    { key: 'nom', label: 'Bâtiment', sortable: true, render: (value: string, item: any) => (
      <View style={styles.cellRow}>
        <View style={[styles.buildingIcon, { backgroundColor: item.statut === 'actif' ? '#10B98120' : '#F59E0B20' }]}>
          <Ionicons name="business-outline" size={18} color={item.statut === 'actif' ? '#10B981' : '#F59E0B'} />
        </View>
        <View>
          <Text style={[styles.cellMain, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.cellSub, { color: theme.tabIconDefault }]}>ID: {item.id}</Text>
        </View>
      </View>
    )},
    { key: 'type', label: 'Type', render: (value: string) => (
      <View style={[styles.badge, { backgroundColor: value === 'élevage' ? '#3B82F620' : value === 'quarantaine' ? '#EF444420' : '#6B728020' }]}>
        <Text style={[styles.badgeText, { color: value === 'élevage' ? '#3B82F6' : value === 'quarantaine' ? '#EF4444' : '#6B7280' }]}>{value}</Text>
      </View>
    )},
    { key: 'capacite', label: 'Capacité', sortable: true, render: (value: number, item: any) => (
      <View>
        <Text style={{ color: theme.text }}><Text style={{ fontWeight: '600' }}>{item.effectifActuel}</Text> / {value}</Text>
        <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
          <View style={[styles.progressFill, { width: `${(item.effectifActuel / value) * 100}%`, backgroundColor: (item.effectifActuel / value) > 0.9 ? '#EF4444' : (item.effectifActuel / value) > 0.7 ? '#10B981' : '#3B82F6' }]} />
        </View>
      </View>
    )},
    { key: 'temperature', label: 'Temp.', sortable: true, render: (value: number) => (
      <View style={styles.flexRow}>
        <Ionicons name="thermometer-outline" size={14} color={value > 30 ? '#EF4444' : '#10B981'} />
        <Text style={{ color: value > 30 ? '#EF4444' : theme.text, marginLeft: 4, fontWeight: value > 30 ? '600' : '400' }}>{value}°C</Text>
      </View>
    )},
    { key: 'humidite', label: 'Humidité', sortable: true, render: (value: number) => (
      <View style={styles.flexRow}>
        <Ionicons name="water-outline" size={14} color={value > 75 ? '#3B82F6' : '#10B981'} />
        <Text style={{ color: theme.text, marginLeft: 4 }}>{value}%</Text>
      </View>
    )},
    { key: 'ammoniac', label: 'Ammoniac', sortable: true, render: (value: number) => (
      <View style={styles.flexRow}>
        <Ionicons name="cloud-outline" size={14} color={value > 15 ? '#EF4444' : value > 10 ? '#F59E0B' : '#10B981'} />
        <Text style={{ color: value > 15 ? '#EF4444' : theme.text, marginLeft: 4, fontWeight: value > 15 ? '600' : '400' }}>{value} ppm</Text>
      </View>
    )},
    { key: 'statut', label: 'Statut', render: (value: string) => {
      const config: Record<string, { color: string; label: string }> = {
        actif: { color: '#10B981', label: 'Actif' },
        maintenance: { color: '#F59E0B', label: 'Maintenance' },
        inactif: { color: '#6B7280', label: 'Inactif' },
      };
      const cfg = config[value] || config.actif;
      return (
        <View style={styles.flexRow}>
          <View style={[styles.statusDot, { backgroundColor: cfg.color }]} />
          <View style={[styles.badge, { backgroundColor: cfg.color + '20' }]}>
            <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
          </View>
        </View>
      );
    }},
    { key: 'responsable', label: 'Responsable', render: (value: string) => (
      <View style={styles.flexRow}>
        <Ionicons name="people-outline" size={14} color={theme.tabIconDefault} />
        <Text style={{ color: theme.text, marginLeft: 4 }}>{value}</Text>
      </View>
    )},
  ];

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'actif', label: 'Actifs' },
    { key: 'maintenance', label: 'Maintenance' },
    { key: 'inactif', label: 'Inactifs' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Gestion des Bâtiments</Text>
          <Text style={[styles.headerSubtitle, { color: theme.tabIconDefault }]}>
            Surveillance IoT en temps réel
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsRow}>
          <StatCard title="Bâtiments Actifs" value={buildings.filter(b => b.statut === 'actif').length} icon="business-outline" color="blue" />
          <StatCard title="Capacité Totale" value={buildings.reduce((acc, b) => acc + b.capacite, 0)} icon="people-outline" color="green" />
          <StatCard title="Température Moy." value={(buildings.reduce((acc, b) => acc + b.temperature, 0) / Math.max(buildings.length, 1)).toFixed(1) + '°C'} icon="thermometer-outline" color="red" />
          <StatCard title="Humidité Moy." value={Math.round(buildings.reduce((acc, b) => acc + b.humidite, 0) / Math.max(buildings.length, 1)) + '%'} icon="water-outline" color="blue" />
          <StatCard title="Alertes Actives" value={buildings.filter(b => b.alertes.length > 0).length} icon="alert-circle-outline" color="orange" />
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
        <View style={styles.filtersRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilterStatus(f.key)}
              style={[
                styles.filterBtn,
                filterStatus === f.key ? { backgroundColor: '#3B82F6' } : { backgroundColor: theme.card, borderColor: theme.border }
              ]}
            >
              <Text style={[styles.filterText, filterStatus === f.key ? { color: '#fff' } : { color: theme.text }]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <SensorChart data={sensorHistory} title="Évolution des capteurs (24h)" />

      <DataTable
        title="Liste des Bâtiments"
        data={filteredBuildings}
        columns={columns}
        onView={(item) => setSelectedBuilding(item)}
        searchable={true}
      />

      {/* Detail Modal */}
      <Modal visible={!!selectedBuilding} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {selectedBuilding && (
              <ScrollView>
                <View style={[styles.modalHeader, { backgroundColor: selectedBuilding.statut === 'actif' ? '#3B82F6' : '#F59E0B' }]}>
                  <Text style={styles.modalHeaderTitle}>{selectedBuilding.nom}</Text>
                  <TouchableOpacity onPress={() => setSelectedBuilding(null)} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.statsGrid}>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Température</Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>{selectedBuilding.temperature}°C</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Humidité</Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>{selectedBuilding.humidite}%</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Ammoniac</Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>{selectedBuilding.ammoniac} ppm</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Équipements</Text>
                    {selectedBuilding.equipements.map((eq: string, index: number) => (
                      <View key={index} style={[styles.infoRow, { backgroundColor: theme.background }]}>
                        <Text style={{ color: theme.text }}>{eq}</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      </View>
                    ))}
                  </View>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Capteurs IoT</Text>
                    {selectedBuilding.capteurs.map((cap: string, index: number) => (
                      <View key={index} style={[styles.infoRow, { backgroundColor: theme.background }]}>
                        <Text style={{ color: theme.text }}>{cap}</Text>
                        <Ionicons name="wifi" size={16} color="#10B981" />
                      </View>
                    ))}
                  </View>

                  {selectedBuilding.alertes.length > 0 && (
                    <View style={[styles.alertBox, { backgroundColor: '#EF444420', borderColor: '#EF444440' }]}>
                      <Text style={{ color: '#EF4444', fontWeight: '600', marginBottom: 8 }}>Alertes actives</Text>
                      {selectedBuilding.alertes.map((alerte: string, index: number) => (
                        <Text key={index} style={{ color: '#EF4444' }}>• {alerte}</Text>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 4 },
  statsScroll: { paddingHorizontal: 16, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12, paddingRight: 16 },
  filtersScroll: { paddingHorizontal: 16, marginBottom: 16 },
  filtersRow: { flexDirection: 'row', gap: 8 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterText: { fontSize: 13, fontWeight: '500' },
  cellRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  buildingIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cellMain: { fontSize: 13, fontWeight: '500' },
  cellSub: { fontSize: 11 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  progressBar: { height: 4, borderRadius: 2, marginTop: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', overflow: 'hidden' },
  modalHeader: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalHeaderTitle: { fontSize: 18, fontWeight: '700', color: '#fff', flex: 1 },
  closeBtn: { padding: 4 },
  modalBody: { padding: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statBox: { width: '31%', padding: 12, borderRadius: 12 },
  statLabel: { fontSize: 12, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 10, marginBottom: 8, alignItems: 'center' },
  alertBox: { padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 16 },
});
