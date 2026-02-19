import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue", bgColor }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-violet-600",
    orange: "from-orange-500 to-amber-600",
    red: "from-red-500 to-rose-600",
    teal: "from-teal-500 to-cyan-600"
  };

  const bgColors = {
    blue: "bg-blue-50 dark:bg-blue-950/30",
    green: "bg-green-50 dark:bg-green-950/30",
    purple: "bg-purple-50 dark:bg-purple-950/30",
    orange: "bg-orange-50 dark:bg-orange-950/30",
    red: "bg-red-50 dark:bg-red-950/30",
    teal: "bg-teal-50 dark:bg-teal-950/30"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl ${bgColors[bgColor || color]} p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-xl`}
    >
      {/* Dégradé de fond animé */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-0 hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} text-white shadow-lg`}>
            <Icon size={24} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
              trend === 'up' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
            }`}>
              {trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span>{trendValue}%</span>
            </div>
          )}
        </div>
        
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
        
        {/* Barre de progression décorative */}
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full bg-gradient-to-r ${colors[color]}`}
          />
        </div>
      </div>

      {/* Effet de particules */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
    </motion.div>
  );
};

export default StatCard;