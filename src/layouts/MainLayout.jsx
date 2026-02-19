import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Menu, X, LayoutDashboard, Factory, 
  Salad, HeartPulse, ShoppingCart, Truck,
  Sun, Moon, Egg, Bell, User,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { to: '/dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
    { to: '/batches', label: 'Bandes', icon: Factory, color: 'from-green-500 to-emerald-600' },
    { to: '/buildings', label: 'Bâtiments', icon: Salad, color: 'from-teal-500 to-cyan-600' },
    { to: '/health', label: 'Suivi Sanitaire', icon: HeartPulse, color: 'from-red-500 to-rose-600' },
    { to: '/sales', label: 'Ventes', icon: ShoppingCart, color: 'from-purple-500 to-violet-600' },
    { to: '/suppliers', label: 'Fournisseurs', icon: Truck, color: 'from-orange-500 to-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Barre latérale avec animation */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-2xl">
          {/* Logo avec animation */}
          <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-6`}>
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-70" />
                <div className="relative p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Egg className="w-8 h-8 text-white" />
                </div>
              </div>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    ManiChicks
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-3 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'} px-4 py-3 mb-2 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="ml-4 font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {/* Tooltip pour mode réduit */}
                    {!isSidebarOpen && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer avec user */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 ${
            isSidebarOpen ? 'block' : 'text-center'
          }`}>
            <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    DG
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Admin DG</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@manichicks.com</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {isSidebarOpen && (
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <User size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Zone principale avec animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        {/* En-tête */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Direction Générale
              </h1>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                En ligne
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative">
                  <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>

              {/* Bouton thème */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDarkMode ? 
                    <Sun size={20} className="text-yellow-400" /> : 
                    <Moon size={20} className="text-gray-700" />
                  }
                </motion.div>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="p-8">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};

export default MainLayout;