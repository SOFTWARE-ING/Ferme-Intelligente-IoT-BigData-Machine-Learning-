import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function Sales() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [sales, setSales] = useState<any[]>([]);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [filterPeriod, setFilterPeriod] = useState('month');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockSales = [
      { id: 'SALE001', batchId: 'BATCH001', batchName: 'Bande A - Poulet de Chair', client: 'Restaurant La Perle', typeClient: 'professionnel', quantite: 150, prixUnitaire: 2500, montantTotal: 375000, dateVente: '2026-02-16', statut: 'livree', modePaiement: 'virement', datePaiement: '2026-02-16', livraison: 'programmee', adresseLivraison: 'Douala, Bonanjo', contact: '699123456', notes: 'Livraison prévue le 17/02', facture: 'FACT-2026-001' },
      { id: 'SALE002', batchId: 'BATCH004', batchName: 'Bande D - Standard', client: 'Supermarché Casino', typeClient: 'professionnel', quantite: 300, prixUnitaire: 2200, montantTotal: 660000, dateVente: '2026-02-15', statut: 'en_attente', modePaiement: 'cheque', datePaiement: null, livraison: 'en_attente', adresseLivraison: 'Douala, Akwa', contact: '699789012', notes: 'Paiement à réception', facture: 'FACT-2026-002' },
      { id: 'SALE003', batchId: 'BATCH001', batchName: 'Bande A - Poulet de Chair', client: 'Mme. Ngo B. (Particulier)', typeClient: 'particulier', quantite: 5, prixUnitaire: 2800, montantTotal: 14000, dateVente: '2026-02-16', statut: 'payee', modePaiement: 'especes', datePaiement: '2026-02-16', livraison: 'immediate', adresseLivraison: 'Douala, Makepe', contact: '699456789', notes: 'Client fidèle', facture: 'FACT-2026-003' },
      { id: 'SALE004', batchId: 'BATCH002', batchName: 'Bande B - Label Rouge', client: 'Hôtel Sawa', typeClient: 'professionnel', quantite: 80, prixUnitaire: 3500, montantTotal: 280000, dateVente: '2026-02-14', statut: 'livree', modePaiement: 'virement', datePaiement: '2026-02-15', livraison: 'livree', adresseLivraison: 'Douala, Bonapriso', contact: '699567890', notes: 'Commande urgente', facture: 'FACT-2026-004' },
      { id: 'SALE005', batchId: 'BATCH003', batchName: 'Bande C - Bio', client: 'Boucherie Moderne', typeClient: 'professionnel', quantite: 50, prixUnitaire: 3200, montantTotal: 160000, dateVente: '2026-02-13', statut: 'annulee', modePaiement: 'carte', datePaiement: null, livraison: 'annulee', adresseLivraison: 'Douala, Deido', contact: '699678901', notes: 'Annulé par le client', facture: 'FACT-2026-005' },
    ];
    setSales(mockSales);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  };

  const calculateStats = () => {
    const total = sales.reduce((acc, s) => acc + s.montantTotal, 0);
    const paid = sales.filter(s => s.statut === 'payee' || s.statut === 'livree').reduce((acc, s) => acc + s.montantTotal, 0);
    const pending = sales.filter(s => s.statut === 'en_attente').reduce((acc, s) => acc + s.montantTotal, 0);
    const totalQuantity = sales.reduce((acc, s) => acc + s.quantite, 0);
    return { total, paid, pending, totalQuantity };
  };

  const stats = calculateStats();

  const getPeriodData = () => {
    const now = new Date();
    const periods: Record<string, number> = { week: 7, month: 30, year: 365 };
    const days = periods[filterPeriod] || 30;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return sales.filter(s => new Date(s.dateVente) >= cutoff);
  };

  const columns = [
    { key: 'batchName', label: 'Produit', sortable: true, render: (value: string, item: any) => (
      <View style={styles.cellRow}>
        <View style={[styles.saleIcon, { backgroundColor: item.statut === 'livree' ? '#10B98120' : item.statut === 'en_attente' ? '#F59E0B20' : item.statut === 'payee' ? '#3B82F620' : '#EF444420' }]}>
          <Ionicons name="cube-outline" size={18} color={item.statut === 'livree' ? '#10B981' : item.statut === 'en_attente' ? '#F59E0B' : item.statut === 'payee' ? '#3B82F6' : '#EF4444'} />
        </View>
        <View>
          <Text style={[styles.cellMain, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.cellSub, { color: theme.tabIconDefault }]}>ID: {item.batchId}</Text>
        </View>
      </View>
    )},
    { key: 'client', label: 'Client', sortable: true, render: (value: string, item: any) => (
      <View>
        <Text style={[styles.cellMain, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.cellSub, { color: theme.tabIconDefault }]}>{item.contact}</Text>
      </View>
    )},
    { key: 'quantite', label: 'Quantité', sortable: true, render: (value: number) => <Text style={{ color: theme.text }}>{value} sujets</Text> },
    { key: 'prixUnitaire', label: 'Prix unit.', sortable: true, render: (value: number) => <Text style={{ color: theme.text, fontWeight: '500' }}>{value.toLocaleString()} FCFA</Text> },
    { key: 'montantTotal', label: 'Montant', sortable: true, render: (value: number) => <Text style={{ color: theme.text, fontWeight: '700' }}>{value.toLocaleString()} FCFA</Text> },
    { key: 'dateVente', label: 'Date', sortable: true, render: (value: string) => <Text style={{ color: theme.text }}>{new Date(value).toLocaleDateString('fr-FR')}</Text> },
    { key: 'statut', label: 'Statut', render: (value: string) => {
      const config: Record<string, { bg: string; text: string; label: string }> = {
        livree: { bg: '#10B981', text: '#10B981', label: 'Livrée' },
        payee: { bg: '#3B82F6', text: '#3B82F6', label: 'Payée' },
        en_attente: { bg: '#F59E0B', text: '#F59E0B', label: 'En attente' },
        annulee: { bg: '#EF4444', text: '#EF4444', label: 'Annulée' },
      };
      const cfg = config[value] || config.en_attente;
      return (
        <View style={[styles.badge, { backgroundColor: cfg.bg + '20' }]}>
          <Text style={[styles.badgeText, { color: cfg.text }]}>{cfg.label}</Text>
        </View>
      );
    }},
    { key: 'modePaiement', label: 'Paiement', render: (value: string) => (
      <View style={styles.flexRow}>
        <Ionicons name="card-outline" size={14} color={theme.tabIconDefault} />
        <Text style={{ color: theme.text, marginLeft: 4, textTransform: 'capitalize' }}>{value}</Text>
      </View>
    )},
  ];

  const periods = [
    { key: 'week', label: 'Cette semaine' },
    { key: 'month', label: 'Ce mois' },
    { key: 'year', label: 'Cette année' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Gestion des Ventes</Text>
          <Text style={[styles.headerSubtitle, { color: theme.tabIconDefault }]}>
            Suivez et gérez toutes vos ventes et clients
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsRow}>
          <StatCard title="Chiffre d'Affaires" value={stats.total.toLocaleString() + ' FCFA'} icon="cash-outline" trend="up" trendValue="15" color="purple" />
          <StatCard title="Ventes Payées" value={stats.paid.toLocaleString() + ' FCFA'} icon="checkmark-circle-outline" color="green" />
          <StatCard title="En Attente" value={stats.pending.toLocaleString() + ' FCFA'} icon="time-outline" color="orange" />
          <StatCard title="Sujets Vendus" value={stats.totalQuantity} icon="cube-outline" color="blue" />
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
        <View style={styles.filtersRow}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.key}
              onPress={() => setFilterPeriod(p.key)}
              style={[styles.filterBtn, filterPeriod === p.key ? { backgroundColor: '#8B5CF6' } : { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <Text style={[styles.filterText, filterPeriod === p.key ? { color: '#fff' } : { color: theme.text }]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <DataTable
        title="Historique des Ventes"
        data={getPeriodData()}
        columns={columns}
        onView={(item) => setSelectedSale(item)}
        searchable={true}
      />

      {/* Detail Modal */}
      <Modal visible={!!selectedSale} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {selectedSale && (
              <ScrollView>
                <View style={[styles.invoiceHeader, { backgroundColor: '#8B5CF6' }]}>
                  <Ionicons name="receipt-outline" size={28} color="#fff" />
                  <Text style={styles.invoiceRef}>{selectedSale.facture}</Text>
                  <Text style={styles.invoiceAmount}>{selectedSale.montantTotal.toLocaleString()} FCFA</Text>
                  <Text style={styles.invoiceDate}>{new Date(selectedSale.dateVente).toLocaleDateString('fr-FR')}</Text>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Client</Text>
                    <View style={styles.rowGrid}>
                      <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                        <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Nom</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSale.client}</Text>
                      </View>
                      <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                        <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Type</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSale.typeClient}</Text>
                      </View>
                    </View>
                    <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Contact</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSale.contact}</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Détails de la commande</Text>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Produit</Text>
                      <Text style={{ color: theme.text, fontWeight: '500' }}>{selectedSale.batchName}</Text>
                    </View>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Quantité</Text>
                      <Text style={{ color: theme.text, fontWeight: '500' }}>{selectedSale.quantite} sujets</Text>
                    </View>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Prix unitaire</Text>
                      <Text style={{ color: theme.text, fontWeight: '500' }}>{selectedSale.prixUnitaire.toLocaleString()} FCFA</Text>
                    </View>
                    <View style={[styles.infoRow, { backgroundColor: theme.background }]}>
                      <Text style={{ color: theme.tabIconDefault }}>Montant total</Text>
                      <Text style={{ color: '#8B5CF6', fontWeight: '700' }}>{selectedSale.montantTotal.toLocaleString()} FCFA</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Livraison</Text>
                    <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                      <View style={styles.flexRow}>
                        <Ionicons name="location-outline" size={18} color={theme.tabIconDefault} style={{ marginRight: 8 }} />
                        <View>
                          <Text style={{ color: theme.text }}>{selectedSale.adresseLivraison}</Text>
                          <Text style={{ color: theme.tabIconDefault, marginTop: 2 }}>Statut: {selectedSale.livraison}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {selectedSale.notes && (
                    <View style={[styles.infoBox, { backgroundColor: '#3B82F620', borderColor: '#3B82F640', borderWidth: 1 }]}>
                      <Text style={{ color: '#3B82F6', fontSize: 13 }}>{selectedSale.notes}</Text>
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
  saleIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cellMain: { fontSize: 13, fontWeight: '500' },
  cellSub: { fontSize: 11 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', overflow: 'hidden' },
  invoiceHeader: { padding: 24, alignItems: 'center' },
  invoiceRef: { color: '#fff', fontSize: 14, opacity: 0.9, marginTop: 8 },
  invoiceAmount: { color: '#fff', fontSize: 28, fontWeight: '700', marginTop: 4 },
  invoiceDate: { color: '#fff', fontSize: 13, opacity: 0.9, marginTop: 4 },
  modalBody: { padding: 16 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  rowGrid: { flexDirection: 'row', gap: 10 },
  infoBox: { padding: 12, borderRadius: 10, marginBottom: 8 },
  infoLabel: { fontSize: 12, marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '600' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 10, marginBottom: 8, alignItems: 'center' },
});
