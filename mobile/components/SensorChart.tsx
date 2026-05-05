import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

interface DataPoint {
  time: string;
  temperature?: number;
  humidite?: number;
  ammoniac?: number;
  densite?: number;
  [key: string]: any;
}

interface SensorChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
}

export default function SensorChart({ data, title = 'Surveillance Environnementale', height = 220 }: SensorChartProps) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={[styles.emptyState, { height }]}>
          <Text style={{ color: theme.tabIconDefault }}>Aucune donnée disponible</Text>
        </View>
      </View>
    );
  }

  const metrics = [
    { key: 'temperature', name: 'Température', color: '#EF4444', unit: '°C' },
    { key: 'humidite', name: 'Humidité', color: '#3B82F6', unit: '%' },
    { key: 'ammoniac', name: 'Ammoniac', color: '#10B981', unit: 'ppm' },
  ];

  const maxTemp = Math.max(...data.map(d => d.temperature || 0), 40);
  const maxHum = Math.max(...data.map(d => d.humidite || 0), 100);
  const maxAmmo = Math.max(...data.map(d => d.ammoniac || 0), 20);

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      
      <View style={styles.metricsRow}>
        {metrics.map(metric => (
          <View key={metric.key} style={styles.metricBadge}>
            <View style={[styles.metricDot, { backgroundColor: metric.color }]} />
            <Text style={[styles.metricText, { color: theme.text }]}>
              {metric.name} ({metric.unit})
            </Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height }}>
        <View style={[styles.chartArea, { height: height - 40 }]}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <View key={i} style={[styles.gridLine, { top: `${i * 25}%`, borderBottomColor: theme.border }]} />
          ))}

          {/* Bars */}
          <View style={styles.barsContainer}>
            {data.map((point, index) => (
              <View key={index} style={styles.barGroup}>
                <View style={styles.barStack}>
                  {point.temperature !== undefined && (
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          backgroundColor: '#EF4444', 
                          height: `${(point.temperature / maxTemp) * 100}%`,
                          opacity: 0.8 
                        }
                      ]} 
                    />
                  )}
                  {point.humidite !== undefined && (
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          backgroundColor: '#3B82F6', 
                          height: `${(point.humidite / maxHum) * 60}%`,
                          opacity: 0.8 
                        }
                      ]} 
                    />
                  )}
                </View>
                <Text style={[styles.timeLabel, { color: theme.tabIconDefault }]} numberOfLines={1}>
                  {point.time}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metricBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricText: {
    fontSize: 12,
  },
  chartArea: {
    width: 600,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.3,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '100%',
    paddingHorizontal: 8,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  barStack: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: '85%',
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  timeLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});
