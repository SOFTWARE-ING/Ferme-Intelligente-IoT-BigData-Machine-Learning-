import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function Batches() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockBatches = [
      { id: 'BATCH001', nom: 'Bande A - Poulet de Chair', fournisseur: 'AgriChick Supplier', dateInstallation: '2026-02-01', batiments: ['Bâtiment A', 'Bâtiment B'], effectifInitial: 1000, effectifActuel: 985, age: 15, poidsMoyen: 0.85, mortalite: 1.5, statut: 'en_croissance', sante: 'excellente', prochaineVaccination: '2026-02-20', consommationAliment: 125.5, consommationEau: 280.3, temperatureMoyenne: 29.5, humiditeMoyenne: 68, alerts: [] },
      { id: 'BATCH002', nom: 'Bande B - Label Rouge', fournisseur: 'Ferme du Sud', dateInstallation: '2026-01-15', batiments: ['Bâtiment C'], effectifInitial: 800, effectifActuel: 765, age: 32, poidsMoyen: 2.1, mortalite: 4.4, statut: 'quarantaine', sante: 'surveillance', prochaineVaccination: '2026-02-18', consommationAliment: 210.8, consommationEau: 450.2, temperatureMoyenne: 30.2, humiditeMoyenne: 72, alerts: ['Taux de mortalité élevé', 'Température instable'] },
      { id: 'BATCH003', nom: 'Bande C - Bio', fournisseur: 'BioPoulet SARL', dateInstallation: '2026-02-10', batiments: ['Bâtiment A', 'Bâtiment D'], effectifInitial: 600, effectifActuel: 598, age: 6, poidsMoyen: 0.32, mortalite: 0.3, statut: 'demarrage', sante: 'excellente', prochaineVaccination: '2026-02-22', consommationAliment: 45.2, consommationEau: 98.5, temperatureMoyenne: 32.0, humiditeMoyenne: 65, alerts: [] },
      { id: 'BATCH004', nom: 'Bande D - Standard', fournisseur: 'AgriChick Supplier', dateInstallation: '2026-01-05', batiments: ['Bâtiment B'], effectifInitial: 1200, effectifActuel: 1120, age: 42, poidsMoyen: 2.8, mortalite: 6.7, statut: 'pret_vente', sante: 'bonne', prochaineVaccination: 'Terminé', consommationAliment: 450.3, consommationEau: 890.6, temperatureMoyenne: 28.5, humiditeMoyenne: 70, alerts: ['Prêt pour la vente'] },
    ];
    setBatches(mockBatches);
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  };

  const filteredBatches = filterStatus === 'all' ? batches : batches.filter(b => b.statut === filterStatus);

  const columns = [
    { key: 'nom', label: 'Bande', sortable: true, render: (value: string, item: any) => (
      <View style={styles.batchCell}>
        <View style={[styles.batchIcon, { backgroundColor: getStatusColor(item.statut) + '20' }]}>
          <Ionicons name="egg-outline" size={18} color={getStatusColor(item.statut)} />
        </View>
        <View>
          <Text style={[styles.cellMain, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.cellSub, { color: theme.tabIconDefault }]}>ID: {item.id}</Text>
        </View>
      </View>
    )},
    { key: 'fournisseur', label: 'Fournisseur', sortable: true, render: (value: string) => (
      <View style={styles.flexRow}>
        <Ionicons name="bus-outline" size={14} color={theme.tabIconDefault} />
        <Text style={{ color: theme.text, marginLeft: 4 }}>{value}</Text>
      </View>
    )},
    { key: 'dateInstallation', label: 'Installation', sortable: true, render: (value: string) => (
      <Text style={{ color: theme.text }}>{new Date(value).toLocaleDateString('fr-FR')}</Text>
    )},
    { key: 'effectifActuel', label: 'Effectif', sortable: true, render: (value: number, item: any) => (
      <View>
        <Text style={{ color: theme.text }}><Text style={{ fontWeight: '600' }}>{value}</Text> / {item.effectifInitial}</Text>
      </View>
    )},
    { key: 'age', label: 'Âge (j)', sortable: true, render: (value: number) => (
      <View style={styles.flexRow}>
        <Ionicons name="calendar-outline" size={14} color={theme.tabIconDefault} />
        <Text style={{ color: theme.text, marginLeft: 4 }}>{value} j</Text>
      </View>
    )},
    { key: 'mortalite', label: 'Mortalité', sortable: true, render: (value: number) => (
      <Text style={{ color: value > 5 ? '#EF4444' : value > 3 ? '#F59E0B' : '#10B981', fontWeight: '600' }}>{value}%</Text>
    )},
    { key: 'statut', label: 'Statut', render: (value: string) => {
      const config: Record<string, { bg: string; text: string; label: string }> = {
        en_croissance: { bg: '#10B981', text: '#10B981', label: 'En croissance' },
        quarantaine: { bg: '#EF4444', text: '#EF4444', label: 'Quarantaine' },
        demarrage: { bg: '#3B82F6', text: '#3B82F6', label: 'Démarrage' },
        pret_vente: { bg: '#8B5CF6', text: '#8B5CF6', label: 'Prêt vente' },
      };
      const cfg = config[value] || config.en_croissance;
      return (
        <View style={[styles.badge, { backgroundColor: cfg.bg + '20' }]}>
          <Text style={[styles.badgeText, { color: cfg.text }]}>{cfg.label}</Text>
        </View>
      );
    }},
  ];

  function getStatusColor(statut: string) {
    const colors: Record<string, string> = {
      en_croissance: '#10B981',
      quarantaine: '#EF4444',
      demarrage: '#3B82F6',
      pret_vente: '#8B5CF6',
    };
    return colors[statut] || '#6B7280';
  }

  const filters = [
    { key: 'all', label: 'Toutes' },
    { key: 'en_croissance', label: 'En croissance' },
    { key: 'demarrage', label: 'Démarrage' },
    { key: 'quarantaine', label: 'Quarantaine' },
    { key: 'pret_vente', label: 'Prêt vente' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Gestion des Bandes</Text>
          <Text style={[styles.headerSubtitle, { color: theme.tabIconDefault }]}>
            Suivez et gérez toutes vos bandes de production
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsRow}>
          <StatCard title="Bandes Actives" value={batches.length} icon="layers-outline" color="green" />
          <StatCard title="Effectif Total" value={batches.reduce((acc, b) => acc + b.effectifActuel, 0)} icon="people-outline" color="blue" />
          <StatCard title="Mortalité Moy." value={(batches.reduce((acc, b) => acc + b.mortalite, 0) / Math.max(batches.length, 1)).toFixed(1) + '%'} icon="pulse-outline" color="red" />
          <StatCard title="Âge Moyen" value={Math.round(batches.reduce((acc, b) => acc + b.age, 0) / Math.max(batches.length, 1)) + ' jours'} icon="calendar-outline" color="purple" />
          <StatCard title="En Quarantaine" value={batches.filter(b => b.statut === 'quarantaine').length} icon="alert-circle-outline" color="orange" />
        </View>
      </ScrollView>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
        <View style={styles.filtersRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilterStatus(f.key)}
              style={[
                styles.filterBtn,
                filterStatus === f.key 
                  ? { backgroundColor: '#10B981' } 
                  : { backgroundColor: theme.card, borderColor: theme.border }
              ]}
            >
              <Text style={[
                styles.filterText,
                filterStatus === f.key ? { color: '#fff' } : { color: theme.text }
              ]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <DataTable
        title="Liste des Bandes"
        data={filteredBatches}
        columns={columns}
        onView={(item) => setSelectedBatch(item)}
        searchable={true}
      />

      {/* Detail Modal */}
      <Modal visible={!!selectedBatch} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {selectedBatch && (
              <ScrollView>
                <View style={[styles.modalHeader, { backgroundColor: getStatusColor(selectedBatch.statut) }]}>
                  <Text style={styles.modalHeaderTitle}>{selectedBatch.nom}</Text>
                  <TouchableOpacity onPress={() => setSelectedBatch(null)} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.statsGrid}>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Effectif</Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>{selectedBatch.effectifActuel} / {selectedBatch.effectifInitial}</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Âge</Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>{selectedBatch.age} jours</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Poids Moyen</Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>{selectedBatch.poidsMoyen} kg</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>Mortalité</Text>
                      <Text style={[styles.statValue, { color: selectedBatch.mortalite > 5 ? '#EF4444' : '#10B981' }]}>{selectedBatch.mortalite}%</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Conditions d'élevage</Text>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Température moyenne</Text>
                      <Text style={{ color: theme.text, fontWeight: '600' }}>{selectedBatch.temperatureMoyenne}°C</Text>
                    </View>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Humidité moyenne</Text>
                      <Text style={{ color: theme.text, fontWeight: '600' }}>{selectedBatch.humiditeMoyenne}%</Text>
                    </View>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Consommation aliment</Text>
                      <Text style={{ color: theme.text, fontWeight: '600' }}>{selectedBatch.consommationAliment} kg/j</Text>
                    </View>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Consommation eau</Text>
                      <Text style={{ color: theme.text, fontWeight: '600' }}>{selectedBatch.consommationEau} L/j</Text>
                    </View>
                  </View>
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
  batchCell: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  batchIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cellMain: { fontSize: 13, fontWeight: '500' },
  cellSub: { fontSize: 11 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', overflow: 'hidden' },
  modalHeader: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalHeaderTitle: { fontSize: 18, fontWeight: '700', color: '#fff', flex: 1 },
  closeBtn: { padding: 4 },
  modalBody: { padding: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statBox: { width: '47%', padding: 12, borderRadius: 12 },
  statLabel: { fontSize: 12, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '700' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 10, marginBottom: 8 },
});
