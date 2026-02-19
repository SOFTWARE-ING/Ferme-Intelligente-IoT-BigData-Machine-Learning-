import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck, Package, Calendar, MapPin,
  Phone, Mail, User, Star, Clock,
  Plus, Search, Filter, Download,
  Eye, Edit2, Trash2, CheckCircle, AlertCircle
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockSuppliers = [
      {
        id: 'SUP001',
        nom: 'AgriChick Supplier',
        contact: 'Jean Nkoulou',
        telephone: '699123456',
        email: 'contact@agrichick.com',
        adresse: 'Douala, Bonaberi',
        produits: ['Poussins chair', 'Aliments', 'Vaccins'],
        delaiLivraison: '2-3 jours',
        note: 4.5,
        totalLivraisons: 12,
        dernierLivraison: '2026-02-01',
        statut: 'actif'
      },
      {
        id: 'SUP002',
        nom: 'Ferme du Sud',
        contact: 'Marie Nganou',
        telephone: '699789012',
        email: 'contact@fermesud.com',
        adresse: 'Yaoundé, Mvog-Mbi',
        produits: ['Poussins label rouge', 'Équipements'],
        delaiLivraison: '3-4 jours',
        note: 4.2,
        totalLivraisons: 8,
        dernierLivraison: '2026-01-15',
        statut: 'actif'
      },
      {
        id: 'SUP003',
        nom: 'BioPoulet SARL',
        contact: 'Paul Atangana',
        telephone: '699345678',
        email: 'contact@biopoulet.com',
        adresse: 'Douala, Makepe',
        produits: ['Poussins bio', 'Aliments bio'],
        delaiLivraison: '2 jours',
        note: 4.8,
        totalLivraisons: 6,
        dernierLivraison: '2026-02-10',
        statut: 'actif'
      }
    ];

    setSuppliers(mockSuppliers);
    setLoading(false);
  }, []);

  const columns = [
    {
      key: 'nom',
      label: 'Fournisseur',
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/50 rounded-lg">
            <Truck size={18} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500">{item.contact}</p>
          </div>
        </div>
      )
    },
    {
      key: 'produits',
      label: 'Produits',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((p, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
              {p}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
              +{value.length - 2}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'note',
      label: 'Note',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-500 fill-current" />
          <span>{value}/5</span>
        </div>
      )
    },
    {
      key: 'delaiLivraison',
      label: 'Délai'
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${value === 'actif' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <span className="capitalize">{value}</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Fournisseurs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestion des fournisseurs de poussins et équipements
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
          <Plus size={20} />
          Nouveau Fournisseur
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Fournisseurs Actifs"
          value={suppliers.length}
          icon={Truck}
          color="purple"
        />
        <StatCard
          title="Note Moyenne"
          value={(suppliers.reduce((acc, s) => acc + s.note, 0) / suppliers.length).toFixed(1) + '/5'}
          icon={Star}
          color="amber"
        />
        <StatCard
          title="Livraisons Total"
          value={suppliers.reduce((acc, s) => acc + s.totalLivraisons, 0)}
          icon={Package}
          color="green"
        />
      </div>

      <DataTable
        title="Liste des Fournisseurs"
        data={suppliers}
        columns={columns}
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        searchable={true}
      />
    </div>
  );
};

export default Suppliers;