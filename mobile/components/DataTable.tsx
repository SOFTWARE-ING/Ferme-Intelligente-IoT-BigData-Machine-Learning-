import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  searchable?: boolean;
}

export default function DataTable({ title, data, columns, onView, onEdit, onDelete, searchable = true }: DataTableProps) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {searchable && (
          <View style={[styles.searchContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Ionicons name="search" size={16} color={theme.tabIconDefault} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Rechercher..."
              placeholderTextColor={theme.tabIconDefault}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header Row */}
          <View style={[styles.row, styles.headerRow, { backgroundColor: theme.background }]}>
            {columns.map((column) => (
              <View key={column.key} style={[styles.cell, styles.headerCell, { width: Math.max(100, column.label.length * 10) }]}>
                <Text style={[styles.headerText, { color: theme.tabIconDefault }]}>{column.label}</Text>
              </View>
            ))}
            {(onView || onEdit || onDelete) && (
              <View style={[styles.cell, styles.headerCell, { width: 100 }]}>
                <Text style={[styles.headerText, { color: theme.tabIconDefault }]}>Actions</Text>
              </View>
            )}
          </View>

          {/* Data Rows */}
          {filteredData.map((item, index) => (
            <View key={item.id || index} style={[styles.row, { borderBottomColor: theme.border }]}>
              {columns.map((column) => (
                <View key={column.key} style={[styles.cell, { width: Math.max(100, column.label.length * 10) }]}>
                  {column.render ? (
                    column.render(item[column.key], item)
                  ) : (
                    <Text style={[styles.cellText, { color: theme.text }]}>{String(item[column.key])}</Text>
                  )}
                </View>
              ))}
              {(onView || onEdit || onDelete) && (
                <View style={[styles.cell, { width: 100, flexDirection: 'row', gap: 8 }]}>
                  {onView && (
                    <TouchableOpacity onPress={() => onView(item)} style={styles.actionBtn}>
                      <Ionicons name="eye-outline" size={18} color={Colors.light.info} />
                    </TouchableOpacity>
                  )}
                  {onEdit && (
                    <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
                      <Ionicons name="create-outline" size={18} color={Colors.light.warning} />
                    </TouchableOpacity>
                  )}
                  {onDelete && (
                    <TouchableOpacity onPress={() => onDelete(item)} style={styles.actionBtn}>
                      <Ionicons name="trash-outline" size={18} color={Colors.light.danger} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
    minWidth: 150,
  },
  searchInput: {
    fontSize: 14,
    padding: 0,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  headerRow: {
    borderBottomWidth: 1,
  },
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  headerCell: {
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cellText: {
    fontSize: 13,
  },
  actionBtn: {
    padding: 4,
  },
});
