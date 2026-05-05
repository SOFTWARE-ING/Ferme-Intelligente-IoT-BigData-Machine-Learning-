import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function Suppliers() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockSuppliers = [
      { id: 'SUP001', nom: 'AgriChick Supplier', contact: 'Jean Nkoulou', telephone: '699123456', email: 'contact@agrichick.com', adresse: 'Douala, Bonaberi', produits: ['Poussins chair', 'Aliments', 'Vaccins'], delaiLivraison: '2-3 jours', note: 4.5, totalLivraisons: 12, dernierLivraison: '2026-02-01', statut: 'actif' },
      { id: 'SUP002', nom: 'Ferme du Sud', contact: 'Marie Nganou', telephone: '699789012', email: 'contact@fermesud.com', adresse: 'Yaoundé, Mvog-Mbi', produits: ['Poussins label rouge', 'Équipements'], delaiLivraison: '3-4 jours', note: 4.2, totalLivraisons: 8, dernierLivraison: '2026-01-15', statut: 'actif' },
      { id: 'SUP003', nom: 'BioPoulet SARL', contact: 'Paul Atangana', telephone: '699345678', email: 'contact@biopoulet.com', adresse: 'Douala, Makepe', produits: ['Poussins bio', 'Aliments bio'], delaiLivraison: '2 jours', note: 4.8, totalLivraisons: 6, dernierLivraison: '2026-02-10', statut: 'actif' },
    ];
    setSuppliers(mockSuppliers);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  };

  const columns = [
    { key: 'nom', label: 'Fournisseur', sortable: true, render: (value: string, item: any) => (
      <View style={styles.cellRow}>
        <View style={[styles.supplierIcon, { backgroundColor: '#8B5CF620' }]}>
          <Ionicons name="cube-outline" size={18} color="#8B5CF6" />
        </View>
        <View>
          <Text style={[styles.cellMain, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.cellSub, { color: theme.tabIconDefault }]}>{item.contact}</Text>
        </View>
      </View>
    )},
    { key: 'produits', label: 'Produits', render: (value: string[]) => (
      <View style={styles.productRow}>
        {value.slice(0, 2).map((p, i) => (
          <View key={i} style={[styles.productBadge, { backgroundColor: theme.background }]}>
            <Text style={{ color: theme.text, fontSize: 11 }}>{p}</Text>
          </View>
        ))}
        {value.length > 2 && (
          <View style={[styles.productBadge, { backgroundColor: theme.background }]}>
            <Text style={{ color: theme.text, fontSize: 11 }}>+{value.length - 2}</Text>
          </View>
        )}
      </View>
    )},
    { key: 'note', label: 'Note', render: (value: number) => (
      <View style={styles.flexRow}>
        <Ionicons name="star" size={14} color="#F59E0B" />
        <Text style={{ color: theme.text, marginLeft: 4, fontWeight: '500' }}>{value}/5</Text>
      </View>
    )},
    { key: 'delaiLivraison', label: 'Délai', render: (value: string) => <Text style={{ color: theme.text }}>{value}</Text> },
    { key: 'statut', label: 'Statut', render: (value: string) => (
      <View style={styles.flexRow}>
        <View style={[styles.statusDot, { backgroundColor: value === 'actif' ? '#10B981' : '#6B7280' }]} />
        <Text style={{ color: theme.text, marginLeft: 6, textTransform: 'capitalize' }}>{value}</Text>
      </View>
    )},
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Fournisseurs</Text>
          <Text style={[styles.headerSubtitle, { color: theme.tabIconDefault }]}>
            Gestion des fournisseurs de poussins et équipements
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsRow}>
          <StatCard title="Fournisseurs Actifs" value={suppliers.length} icon="cube-outline" color="purple" />
          <StatCard title="Note Moyenne" value={(suppliers.reduce((acc, s) => acc + s.note, 0) / Math.max(suppliers.length, 1)).toFixed(1) + '/5'} icon="star-outline" color="amber" />
          <StatCard title="Livraisons Total" value={suppliers.reduce((acc, s) => acc + s.totalLivraisons, 0)} icon="layers-outline" color="green" />
        </View>
      </ScrollView>

      <DataTable
        title="Liste des Fournisseurs"
        data={suppliers}
        columns={columns}
        onView={(item) => setSelectedSupplier(item)}
        searchable={true}
      />

      {/* Detail Modal */}
      <Modal visible={!!selectedSupplier} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {selectedSupplier && (
              <ScrollView>
                <View style={[styles.modalHeader, { backgroundColor: '#8B5CF6' }]}>
                  <Text style={styles.modalHeaderTitle}>{selectedSupplier.nom}</Text>
                  <TouchableOpacity onPress={() => setSelectedSupplier(null)} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.rowGrid}>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Contact</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSupplier.contact}</Text>
                    </View>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Téléphone</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSupplier.telephone}</Text>
                    </View>
                  </View>

                  <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                    <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Email</Text>
                    <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSupplier.email}</Text>
                  </View>

                  <View style={[styles.infoBox, { backgroundColor: theme.background }]}>
                    <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Adresse</Text>
                    <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSupplier.adresse}</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Produits</Text>
                    <View style={styles.productRow}>
                      {selectedSupplier.produits.map((p: string, i: number) => (
                        <View key={i} style={[styles.productBadge, { backgroundColor: '#8B5CF620' }]}>
                          <Text style={{ color: '#8B5CF6', fontSize: 13 }}>{p}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.rowGrid}>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Note</Text>
                      <View style={styles.flexRow}>
                        <Ionicons name="star" size={16} color="#F59E0B" />
                        <Text style={{ color: theme.text, marginLeft: 4, fontWeight: '600' }}>{selectedSupplier.note}/5</Text>
                      </View>
                    </View>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Délai</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSupplier.delaiLivraison}</Text>
                    </View>
                  </View>

                  <View style={styles.rowGrid}>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Livraisons</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{selectedSupplier.totalLivraisons}</Text>
                    </View>
                    <View style={[styles.infoBox, { backgroundColor: theme.background, flex: 1 }]}>
                      <Text style={[styles.infoLabel, { color: theme.tabIconDefault }]}>Dernière</Text>
                      <Text style={[styles.infoValue, { color: theme.text }]}>{new Date(selectedSupplier.dernierLivraison).toLocaleDateString('fr-FR')}</Text>
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
  cellRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  supplierIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cellMain: { fontSize: 13, fontWeight: '500' },
  cellSub: { fontSize: 11 },
  productRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  productBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', overflow: 'hidden' },
  modalHeader: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalHeaderTitle: { fontSize: 18, fontWeight: '700', color: '#fff', flex: 1 },
  closeBtn: { padding: 4 },
  modalBody: { padding: 16 },
  rowGrid: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  infoBox: { padding: 12, borderRadius: 10, marginBottom: 8 },
  infoLabel: { fontSize: 12, marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '600' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
});
