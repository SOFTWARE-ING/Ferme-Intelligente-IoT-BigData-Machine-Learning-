import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Brush 
} from 'recharts';
import { Thermometer, Droplets, Wind, Activity, Calendar } from 'lucide-react';

const SensorChart = ({ 
  data = [], 
  type = 'line', 
  height = 400,
  showBrush = true 
}) => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const metrics = [
    { key: 'temperature', name: 'Température', color: '#ef4444', unit: '°C', icon: Thermometer },
    { key: 'humidite', name: 'Humidité', color: '#3b82f6', unit: '%', icon: Droplets },
    { key: 'ammoniac', name: 'Ammoniac', color: '#10b981', unit: 'ppm', icon: Wind },
    { key: 'densite', name: 'Densité', color: '#f59e0b', unit: 'sujets/m²', icon: Activity }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-gray-900 dark:text-white font-medium">
                {entry.name}: {entry.value} {entry.unit}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch(type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              {metrics.map(metric => (
                <linearGradient key={metric.key} id={`gradient-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metric.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {metrics.map(metric => (
              <Area
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.name}
                stroke={metric.color}
                fill={`url(#gradient-${metric.key})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {metrics.map(metric => (
              <Bar
                key={metric.key}
                dataKey={metric.key}
                name={metric.name}
                fill={metric.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {metrics.map(metric => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.name}
                stroke={metric.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Surveillance Environnementale
        </h3>
        <div className="flex items-center gap-3">
          {metrics.map(metric => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`p-2 rounded-xl transition-all ${
                selectedMetric === metric.key
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <metric.icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>

      {showBrush && (
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={data}>
              <Brush 
                dataKey="time" 
                height={30} 
                stroke="#3b82f6"
                fill="rgba(59, 130, 246, 0.1)"
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke="#3b82f6"
                fill="rgba(59, 130, 246, 0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

export default SensorChart;