# ManiChicks Mobile - Application de Ferme Intelligente

Application React Native avec Expo pour la gestion intelligente de ferme avicole (IoT, Big Data, Machine Learning).

## Structure du projet

Ce projet est la version mobile de l'application web React.js [Ferme-Intelligente-IoT-BigData-Machine-Learning](https://github.com/SOFTWARE-ING/Ferme-Intelligente-IoT-BigData-Machine-Learning-.git).

## Stack technique

- **React Native** avec **Expo**
- **Expo Router** pour la navigation
- **TypeScript**
- **@expo/vector-icons** pour les icônes

## Structure des fichiers

```
mobile/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Layout des onglets (tab bar)
│   │   ├── _layout.tsx           # Configuration de la navigation par tabs
│   │   ├── index.tsx             # Tableau de bord (Dashboard)
│   │   ├── batches.tsx           # Gestion des bandes
│   │   ├── buildings.tsx         # Gestion des bâtiments (IoT)
│   │   ├── health.tsx            # Suivi sanitaire
│   │   ├── sales.tsx             # Gestion des ventes
│   │   └── suppliers.tsx         # Gestion des fournisseurs
│   ├── modal.tsx                 # Modal paramètres
│   ├── +html.tsx                 # Template HTML
│   ├── +not-found.tsx            # Page 404
│   └── _layout.tsx               # Layout racine
├── components/                   # Composants réutilisables
│   ├── StatCard.tsx              # Cartes de statistiques
│   ├── DataTable.tsx             # Tableaux de données
│   └── SensorChart.tsx           # Graphiques de capteurs
├── constants/
│   └── Colors.ts                 # Palette de couleurs
├── contexts/
│   └── ThemeContext.tsx            # Contexte clair/sombre
├── assets/                       # Images, fonts, etc.
└── package.json
```

## Pages et fonctionnalités

| Onglet | Icone | Description |
|--------|-------|-------------|
| Dashboard | `grid-outline` | KPIs en temps réel, alertes, graphiques capteurs |
| Bandes | `layers-outline` | Gestion des bandes de production, filtres par statut |
| Bâtiments | `business-outline` | Surveillance IoT (température, humidité, ammoniac) |
| Santé | `medical-outline` | Examens, vaccinations, alertes sanitaires |
| Ventes | `cart-outline` | Suivi des ventes, facturation, livraison |
| Fournisseurs | `cube-outline` | Annuaire fournisseurs, évaluations |

## Installation

```bash
# Cloner le projet
cd mobile

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npx expo start
```

## Lancer sur un appareil

- **iOS** : Appuyez sur `i` dans le terminal ou scannez le QR code avec l'appareil photo
- **Android** : Appuyez sur `a` dans le terminal ou scannez le QR code avec l'app Expo Go
- **Web** : Appuyez sur `w` pour lancer la version web

## Conversion depuis React.js

Les pages originales du sidebar web ont été converties en onglets (tabs) de la barre de navigation inférieure :

| Sidebar Web | Tab Mobile | Icone |
|-------------|-----------|-------|
| Tableau de Bord | Dashboard | grid-outline |
| Bandes | Bandes | layers-outline |
| Bâtiments | Bâtiments | business-outline |
| Suivi Sanitaire | Santé | medical-outline |
| Ventes | Ventes | cart-outline |
| Fournisseurs | Fournisseurs | cube-outline |

## Auteur

Converti automatiquement depuis le projet React.js original.
