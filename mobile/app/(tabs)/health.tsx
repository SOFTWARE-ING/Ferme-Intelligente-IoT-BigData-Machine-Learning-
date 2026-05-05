import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function Health() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [healthRecords, setHealthRecords] = useState<any[]>([]);
  const [vaccinations, setVaccinations] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockHealthRecords = [
      { id: 'HEALTH001', batchId: 'BATCH001', batchName: 'Bande A - Poulet de Chair', date: '2026-02-16', type: 'examen', personnel: 'Dr. Kameni', mortaliteJour: 2, symptomes: ['Aucun'], traitement: 'Aucun', observations: 'État général excellent', prochaineVisite: '2026-02-23', alertes: [] },
      { id: 'HEALTH002', batchId: 'BATCH002', batchName: 'Bande B - Label Rouge', date: '2026-02-16', type: 'urgence', personnel: 'Dr. Nganou', mortaliteJour: 8, symptomes: ['Toux', 'Abattement', 'Diarrhée'], traitement: 'Antibiotiques dans l\'eau', observations: 'Suspicion de maladie respiratoire', prochaineVisite: '2026-02-17', alertes: ['Urgence sanitaire', 'Taux de mortalité élevé'] },
      { id: 'HEALTH003', batchId: 'BATCH003', batchName: 'Bande C - Bio', date: '2026-02-15', type: 'vaccination', personnel: 'Technicien Mbarga', mortaliteJour: 0, vaccin: 'Newcastle', dose: '2ml/sujet', observations: 'Vaccination réussie', prochaineVisite: '2026-03-01', alertes: [] },
      { id: 'HEALTH004', batchId: 'BATCH004', batchName: 'Bande D - Standard', date: '2026-02-14', type: 'examen', personnel: 'Dr. Kameni', mortaliteJour: 5, symptomes: ['Légère toux'], traitement: 'Vitamines', observations: 'Surveillance recommandée', prochaineVisite: '2026-02-18', alertes: ['Surveillance requise'] },
    ];

    const mockVaccinations = [
      { id: 'VACC001', batchId: 'BATCH001', batchName: 'Bande A - Poulet de Chair', datePrevue: '2026-02-20', dateReelle: null, typeVaccin: 'Newcastle', dose: '2ml', statut: 'planifie', responsable: 'Dr. Kameni' },
      { id: 'VACC002', batchId: 'BATCH002', batchName: 'Bande B - Label Rouge', datePrevue: '2026-02-18', dateReelle: null, typeVaccin: 'Gumboro', dose: '1.5ml', statut: 'planifie', responsable: 'Dr. Nganou' },
      { id: 'VACC003', batchId: 'BATCH003', batchName: 'Bande C - Bio', datePrevue: '2026-02-22', dateReelle: null, typeVaccin: 'Bronchite Infectieuse', dose: '2ml', statut: 'planifie', responsable: 'Technicien Mbarga' },
    ];

    setHealthRecords(mockHealthRecords);
    setVaccinations(mockVaccinations);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  };

  const columns = [
    { key: 'batchName', label: 'Bande', sortable: true, render: (value: string, item: any) => (
      <View style={styles.cellRow}>
        <View style={[styles.healthIcon, { backgroundColor: item.type === 'urgence' ? '#EF444420' : item.type === 'vaccination' ? '#10B98120' : '#3B82F620' }]}>
          <Ionicons name={item.type === 'vaccination' ? 'medical-outline' : item.type === 'urgence' ? 'warning-outline' : 'heart-outline'} size={18} color={item.type === 'urgence' ? '#EF4444' : item.type === 'vaccination' ? '#10B981' : '#3B82F6'} />
        </View>
        <View>
          <Text style={[styles.cellMain, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.cellSub, { color: theme.tabIconDefault }]}>{item.batchId}</Text>
        </View>
      </View>
    )},
    { key: 'date', label: 'Date', sortable: true, render: (value: string) => <Text style={{ color: theme.text }}>{new Date(value).toLocaleDateString('fr-FR')}</Text> },
    { key: 'type', label: 'Type', render: (value: string) => {
      const config: Record<string, { bg: string; text: string; label: string }> = {
        examen: { bg: '#3B82F6', text: '#3B82F6', label: 'Examen' },
        vaccination: { bg: '#10B981', text: '#10B981', label: 'Vaccination' },
        urgence: { bg: '#EF4444', text: '#EF4444', label: 'Urgence' },
      };
      const cfg = config[value] || config.examen;
      return (
        <View style={[styles.badge, { backgroundColor: cfg.bg + '20' }]}>
          <Text style={[styles.badgeText, { color: cfg.text }]}>{cfg.label}</Text>
        </View>
      );
    }},
    { key: 'personnel', label: 'Vétérinaire', sortable: true, render: (value: string) => <Text style={{ color: theme.text }}>{value}</Text> },
    { key: 'mortaliteJour', label: 'Mortalité', sortable: true, render: (value: number) => (
      <Text style={{ color: value > 5 ? '#EF4444' : theme.text, fontWeight: value > 5 ? '600' : '400' }}>{value}</Text>
    )},
    { key: 'prochaineVisite', label: 'Prochaine visite', render: (value: string) => {
      const date = new Date(value);
      const today = new Date();
      const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return (
        <View style={styles.flexRow}>
          <Ionicons name="calendar-outline" size={14} color={theme.tabIconDefault} />
          <Text style={{ color: diffDays <= 1 ? '#EF4444' : diffDays <= 3 ? '#F59E0B' : theme.text, marginLeft: 4, fontWeight: diffDays <= 1 ? '600' : '400' }}>
            {value} {diffDays <= 1 && '(Urgent)'}
          </Text>
        </View>
      );
    }},
  ];

  const vaccinationColumns = [
    { key: 'batchName', label: 'Bande', render: (value: string) => (
      <View style={styles.flexRow}>
        <Ionicons name="medical-outline" size={16} color={Colors.light.info} />
        <Text style={{ color: theme.text, marginLeft: 6 }}>{value}</Text>
      </View>
    )},
    { key: 'datePrevue', label: 'Date prévue', render: (value: string) => <Text style={{ color: theme.text }}>{new Date(value).toLocaleDateString('fr-FR')}</Text> },
    { key: 'typeVaccin', label: 'Vaccin', render: (value: string) => <Text style={{ color: theme.text }}>{value}</Text> },
    { key: 'statut', label: 'Statut', render: (value: string) => (
      <View style={[styles.badge, { backgroundColor: value === 'planifie' ? '#3B82F620' : '#10B98120' }]}>
        <Text style={[styles.badgeText, { color: value === 'planifie' ? '#3B82F6' : '#10B981' }]}>{value === 'planifie' ? 'Planifié' : 'Effectué'}</Text>
      </View>
    )},
    { key: 'responsable', label: 'Responsable', render: (value: string) => <Text style={{ color: theme.text }}>{value}</Text> },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Suivi Sanitaire</Text>
          <Text style={[styles.headerSubtitle, { color: theme.tabIconDefault }]}>
            Surveillance de la santé animale et vaccinations
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsRow}>
          <StatCard title="Examens (7j)" value={healthRecords.filter(r => { const d = new Date(r.date); const w = new Date(); w.setDate(w.getDate() - 7); return d >= w; }).length} icon="heart-outline" color="blue" />
          <StatCard title="Vaccinations" value={vaccinations.length} icon="medical-outline" color="green" />
          <StatCard title="Urgences" value={healthRecords.filter(r => r.type === 'urgence').length} icon="warning-outline" color="red" />
          <StatCard title="Sous surveillance" value={healthRecords.filter(r => r.alertes && r.alertes.length > 0).length} icon="eye-outline" color="orange" />
          <StatCard title="Mortalité totale" value={healthRecords.reduce((acc, r) => acc + r.mortaliteJour, 0)} icon="alert-circle-outline" color="purple" />
        </View>
      </ScrollView>

      {/* Health Alerts */}
      <View style={[styles.alertsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.alertsHeader}>
          <Ionicons name="warning-outline" size={20} color={Colors.light.danger} />
          <Text style={[styles.alertsTitle, { color: theme.text }]}>Alertes sanitaires</Text>
        </View>
        {healthRecords.filter(r => r.alertes && r.alertes.length > 0).map((record) => (
          <View key={record.id} style={[styles.alertItem, { borderBottomColor: theme.border }]}>
            <Text style={[styles.alertBatch, { color: theme.text }]}>{record.batchName}</Text>
            {record.alertes.map((alerte: string, idx: number) => (
              <Text key={idx} style={{ color: '#EF4444', fontSize: 13, marginTop: 2 }}>• {alerte}</Text>
            ))}
            <Text style={[styles.alertDate, { color: theme.tabIconDefault }]}>{new Date(record.date).toLocaleDateString('fr-FR')}</Text>
          </View>
        ))}
      </View>

      <DataTable
        title="Registre des Examens"
        data={healthRecords}
        columns={columns}
        onView={(item) => setSelectedRecord(item)}
        searchable={true}
      />

      <DataTable
        title="Planning des Vaccinations"
        data={vaccinations}
        columns={vaccinationColumns}
        searchable={false}
      />

      {/* Detail Modal */}
      <Modal visible={!!selectedRecord} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {selectedRecord && (
              <ScrollView>
                <View style={[styles.modalHeader, { backgroundColor: selectedRecord.type === 'urgence' ? '#EF4444' : '#3B82F6' }]}>
                  <Text style={styles.modalHeaderTitle}>Détails de l'examen</Text>
                  <TouchableOpacity onPress={() => setSelectedRecord(null)} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                    <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Bande</Text>
                    <Text style={[styles.infoValue, { color: theme.text }]}>{selectedRecord.batchName}</Text>
                    <Text style={{ color: theme.tabIconDefault, fontSize: 12 }}>{selectedRecord.batchId}</Text>
                  </View>

                  <View style={styles.rowGrid}>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Date</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{new Date(selectedRecord.date).toLocaleDateString('fr-FR')}</Text>
                    </View>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Vétérinaire</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{selectedRecord.personnel}</Text>
                    </View>
                  </View>

                  <View style={[styles.infoBox, { backgroundColor: '#EF444420' }]}>
                    <Text style={{ color: '#EF4444', fontSize: 13 }}>Mortalité du jour</Text>
                    <Text style={{ color: '#EF4444', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{selectedRecord.mortaliteJour} sujets</Text>
                  </View>

                  {selectedRecord.symptomes && selectedRecord.symptomes.length > 0 && (
                    <View>
                      <Text style={[styles.sectionTitle, { color: theme.text }]}>Symptômes observés</Text>
                      <View style={styles.symptomRow}>
                        {selectedRecord.symptomes.map((s: string, i: number) => (
                          <View key={i} style={[styles.symptomBadge, { backgroundColor: '#F59E0B20' }]}>
                            <Text style={{ color: '#F59E0B', fontSize: 12 }}>{s}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  <View>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Traitement</Text>
                    <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.text }}>{selectedRecord.traitement || 'Aucun'}</Text>
                    </View>
                  </View>

                  <View>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Observations</Text>
                    <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.text }}>{selectedRecord.observations}</Text>
                    </View>
                  </View>

                  <View style={[styles.infoBox, { backgroundColor: '#3B82F620', borderColor: '#3B82F640', borderWidth: 1 }]}>
                    <Text style={{ color: '#3B82F6', fontSize: 13 }}>Prochaine visite</Text>
                    <Text style={{ color: '#3B82F6', fontSize: 18, fontWeight: '600', marginTop: 4 }}>{selectedRecord.prochaineVisite}</Text>
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
  alertsCard: { margin: 16, borderRadius: 16, borderWidth: 1, padding: 16 },
  alertsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  alertsTitle: { fontSize: 16, fontWeight: '600' },
  alertItem: { paddingVertical: 12, borderBottomWidth: 1 },
  alertBatch: { fontSize: 14, fontWeight: '500' },
  alertDate: { fontSize: 12, marginTop: 6 },
  cellRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  healthIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
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
  infoBox: { padding: 14, borderRadius: 12, marginBottom: 10 },
  infoLabel: { fontSize: 12, marginBottom: 4 },
  infoValue: { fontSize: 16, fontWeight: '600' },
  rowGrid: { flexDirection: 'row', gap: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8, marginTop: 4 },
  symptomRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
});
