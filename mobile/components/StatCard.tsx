import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

export default function StatCard({ title, value, icon, trend, trendValue, color = 'blue' }: StatCardProps) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const colorMap: Record<string, string> = {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#8B5CF6',
    orange: '#F59E0B',
    red: '#EF4444',
    teal: '#14B8A6',
    amber: '#F59E0B',
  };

  const iconColor = colorMap[color] || colorMap.blue;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon as any} size={22} color={iconColor} />
        </View>
        {trend && (
          <View style={[styles.trendBadge, { 
            backgroundColor: trend === 'up' ? '#10B98120' : '#EF444420' 
          }]}>
            <Ionicons 
              name={trend === 'up' ? 'arrow-up' : 'arrow-down'} 
              size={12} 
              color={trend === 'up' ? '#10B981' : '#EF4444'} 
            />
            <Text style={[styles.trendText, { 
              color: trend === 'up' ? '#10B981' : '#EF4444' 
            }]}>
              {trendValue}%
            </Text>
          </View>
        )}
      </View>
      
      <Text style={[styles.title, { color: theme.tabIconDefault }]}>{title}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '75%', backgroundColor: iconColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
    minWidth: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
