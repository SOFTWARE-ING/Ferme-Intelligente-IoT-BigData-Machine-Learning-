// =====================================================
// BASE DE DONNÉES MANICHICKS - SCRIPT CORRIGÉ
// =====================================================

// Sélection de la base de données (méthode alternative)
db = db.getSiblingDB('manichicks_db');

print("📁 Création de la base de données: manichicks_db");

// =====================================================
// 1. COLLECTION : fournisseurs (Suppliers)
// =====================================================
db.fournisseurs.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8c9"),
    "code": "FOUR001",
    "nom": "AgriChick Supplier",
    "type": "poussins",
    "contact_principal": {
        "nom": "Jean Nkoulou",
        "fonction": "Directeur Commercial",
        "telephone": "+237699123456",
        "email": "j.nkoulou@agrichick.com"
    },
    "contacts_secondaires": {
        "nom": "Marie Ngono",
        "fonction": "Chargee de clientele",
        "telephone": "+237699123457",
        "email": "m.ngono@agrichick.com"
    },
    "adresse": {
        "ville": "Douala",
        "quartier": "Bonaberi",
        "bp": "1234",
        "localisation_gps": {
            "latitude": 4.0511,
            "longitude": 9.7679
        }
    },
    "produits_fournis": [
        {
            "categorie": "poussins",
            "type_produit": "poulet_chair",
            "prix_unitaire": 850,
            "disponible": true,
            "delai_livraison_jours": 2
        },
        {
            "categorie": "aliments",
            "type_produit": "demarrage",
            "prix_unitaire": 25000,
            "unite": "sac_50kg",
            "disponible": true
        }
    ],
    "evaluation": {
        "note_moyenne": 4.5,
        "nombre_livraisons": 12,
        "respect_delais": 95,
        "qualite_produits": 4.3,
        "commentaires": [
            {
                "date": ISODate("2026-02-01T10:30:00Z"),
                "utilisateur": "Jean Mbarga",
                "note": 5,
                "commentaire": "Livraison rapide, poussins en bonne santé"
            }
        ]
    },
    "contrats": [
        {
            "numero": "CTR-2025-001",
            "date_debut": ISODate("2025-01-01T00:00:00Z"),
            "date_fin": ISODate("2025-12-31T23:59:59Z"),
            "conditions": "Paiement à 30 jours",
            "fichier_url": "/contrats/ctr-2025-001.pdf"
        }
    ],
    "statistiques": {
        "total_livraisons": 12,
        "total_montant": 15000000,
        "derniere_livraison": ISODate("2026-02-01T08:00:00Z"),
        "prochaine_livraison_prevue": ISODate("2026-02-20T08:00:00Z")
    },
    "statut": "actif",
    "date_creation": ISODate("2025-01-10T09:00:00Z"),
    "date_modification": ISODate("2026-02-15T14:30:00Z"),
    "created_by": ObjectId("67d4f8a1b2c3d4e5f6a7b111")
});

print("✅ Collection fournisseurs créée");

// =====================================================
// 2. COLLECTION : bandes (Batches)
// =====================================================
db.bandes.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d0"),
    "code": "BANDE001",
    "nom": "Bande A - Poulet de Chair",
    "fournisseur_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8c9"),
    "fournisseur_nom": "AgriChick Supplier",
    "date_installation": ISODate("2026-02-01T08:00:00Z"),
    "date_demarrage": ISODate("2026-02-01T08:00:00Z"),
    "date_fin_prevue": ISODate("2026-03-15T00:00:00Z"),
    "type_production": "poulet_chair",
    "statut": "en_croissance",
    "lots": [
        {
            "lot_id": "LOT001",
            "batiment_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d1"),
            "batiment_nom": "Bâtiment A",
            "effectif_initial": 500,
            "effectif_actual": 495,
            "date_transfert": ISODate("2026-02-01T08:00:00Z"),
            "employee_responsable_id": ObjectId("67d4f8a1b2c3d4e5f6a7b112")
        },
        {
            "lot_id": "LOT002",
            "batiment_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d2"),
            "batiment_nom": "Bâtiment B",
            "effectif_initial": 500,
            "effectif_actual": 490,
            "date_transfert": ISODate("2026-02-01T08:00:00Z"),
            "employee_responsable_id": ObjectId("67d4f8a1b2c3d4e5f6a7b113")
        }
    ],
    "effectif_initial": 1000,
    "effectif_actuel": 985,
    "age_jours": 15,
    "poids_moyen": 0.85,
    "poids_total": 837.25,
    "mortalite": {
        "totale": 15,
        "pourcentage": 1.5,
        "journaliere": 2,
        "causes": [
            {
                "cause": "naturelle",
                "nombre": 12,
                "pourcentage": 80
            },
            {
                "cause": "maladie",
                "nombre": 3,
                "pourcentage": 20
            }
        ]
    },
    "consommation": {
        "aliment": {
            "total_kg": 125.5,
            "journalier_kg": 8.37,
            "conversion_alimentaire": 1.85,
            "par_type": [
                {
                    "type": "demarrage",
                    "quantite_kg": 45.2,
                    "pourcentage": 36
                }
            ]
        }
    },
    "notes": "Bande en bonne santé, croissance conforme aux prévisions",
    "date_creation": ISODate("2026-02-01T07:30:00Z"),
    "date_modification": ISODate("2026-02-16T15:00:00Z"),
    "created_by": ObjectId("67d4f8a1b2c3d4e5f6a7b110")
});

print("✅ Collection bandes créée");

// =====================================================
// 3. COLLECTION : batiments (Buildings)
// =====================================================
db.batiments.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d1"),
    "code": "BAT01",
    "nom": "Bâtiment A - Poulet de Chair",
    "type": "elevage",
    "description": "Bâtiment principal pour poulets de chair",
    "caracteristiques": {
        "superficie_m2": 500,
        "hauteur_m": 4.5,
        "capacite_maximale": 600,
        "capacite_actuelle": 585,
        "nombre_boxes": 10,
        "orientation": "nord-sud",
        "ventilation": "mixte",
        "isolation": "bonne"
    },
    "equipements": [
        {
            "nom": "Système de ventilation",
            "type": "ventilation",
            "modele": "VentilPro 3000",
            "date_installation": ISODate("2025-01-15T00:00:00Z"),
            "statut": "fonctionnel",
            "derniere_maintenance": ISODate("2026-02-10T09:00:00Z"),
            "prochaine_maintenance": ISODate("2026-03-10T09:00:00Z")
        },
        {
            "nom": "Chauffage infrarouge",
            "type": "chauffage",
            "modele": "HeatMaster 500",
            "date_installation": ISODate("2025-01-15T00:00:00Z"),
            "statut": "fonctionnel",
            "derniere_maintenance": ISODate("2026-02-05T10:00:00Z"),
            "prochaine_maintenance": ISODate("2026-03-05T10:00:00Z")
        },
        {
            "nom": "Éclairage LED",
            "type": "eclairage",
            "nombre_unites": 20,
            "statut": "fonctionnel"
        },
        {
            "nom": "Système alimentation automatique",
            "type": "alimentation",
            "modele": "FeedTech 2000",
            "statut": "fonctionnel"
        }
    ],
    "capteurs": [
        {
            "capteur_id": "TEMP001",
            "type": "temperature",
            "modele": "DS18B20",
            "localisation": "centre",
            "statut": "actif",
            "derniere_donnee": {
                "valeur": 29.5,
                "timestamp": ISODate("2026-02-16T15:30:00Z")
            },
            "batterie": 85,
            "signal": 92
        },
        {
            "capteur_id": "HUM001",
            "type": "humidite",
            "modele": "DHT22",
            "localisation": "est",
            "statut": "actif",
            "derniere_donnee": {
                "valeur": 68,
                "timestamp": ISODate("2026-02-16T15:30:00Z")
            },
            "batterie": 78,
            "signal": 95
        }
    ],
    "maintenance": {
        "derniere": ISODate("2026-02-10T11:00:00Z"),
        "prochaine": ISODate("2026-03-10T11:00:00Z"),
        "historique": [
            {
                "date": ISODate("2026-02-10T11:00:00Z"),
                "type": "preventive",
                "description": "Nettoyage des ventilateurs",
                "technicien": "Paul Atangana",
                "cout": 50000
            }
        ]
    },
    "alertes": [],
    "statut": "actif",
    "date_creation": ISODate("2025-01-10T08:00:00Z"),
    "date_modification": ISODate("2026-02-16T15:30:00Z")
});

print("✅ Collection batiments créée");

// =====================================================
// 4. COLLECTION : donnees_capteurs (Time Series IoT)
// =====================================================
db.createCollection("donnees_capteurs", {
    timeseries: {
        timeField: "timestamp",
        metaField: "capteur_id",
        granularity: "seconds"
    }
});

db.donnees_capteurs.insertMany([
    {
        "batiment_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d1"),
        "batiment_code": "BAT01",
        "capteur_id": "TEMP001",
        "capteur_type": "temperature",
        "valeur": 29.5,
        "unite": "°C",
        "timestamp": ISODate("2026-02-16T15:30:00Z"),
        "qualite_signal": 92,
        "batterie": 85,
        "seuils": {
            "min": 18,
            "max": 32,
            "warning_min": 20,
            "warning_max": 30,
            "critique_min": 16,
            "critique_max": 34
        },
        "statut": "warning",
        "traite": false,
        "date_insertion": ISODate("2026-02-16T15:30:05Z")
    },
    {
        "batiment_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d1"),
        "batiment_code": "BAT01",
        "capteur_id": "HUM001",
        "capteur_type": "humidite",
        "valeur": 68,
        "unite": "%",
        "timestamp": ISODate("2026-02-16T15:30:00Z"),
        "qualite_signal": 95,
        "batterie": 78,
        "seuils": {
            "min": 40,
            "max": 70,
            "warning_min": 45,
            "warning_max": 65,
            "critique_min": 35,
            "critique_max": 80
        },
        "statut": "warning",
        "traite": false,
        "date_insertion": ISODate("2026-02-16T15:30:05Z")
    }
]);

print("✅ Collection donnees_capteurs (Time Series) créée");

// =====================================================
// 5. COLLECTION : suivis_sanitaires (Health Records)
// =====================================================
db.suivis_sanitaires.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8f0"),
    "code": "HEALTH001",
    "bande_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d0"),
    "bande_nom": "Bande A - Poulet de Chair",
    "type": "examen",
    "date": ISODate("2026-02-16T09:00:00Z"),
    "veterinaire": {
        "id": ObjectId("67d4f8a1b2c3d4e5f6a7b117"),
        "nom": "Dr. Kameni",
        "specialite": "avicole",
        "structure": "interne"
    },
    "examen": {
        "motif": "Contrôle de routine",
        "symptomes_observes": ["Aucun"],
        "diagnostic": "État général excellent",
        "recommandations": "Poursuivre le suivi normal",
        "pieces_jointes": []
    },
    "mortalite": {
        "journaliere": 2,
        "cumulee": 15,
        "causes_principales": ["naturelle"],
        "autopsie_realisee": false
    },
    "traitements": {
        "type": "vitamine",
        "produit": "Vitamine complexe",
        "dosage": "5ml/litre",
        "voie_administration": "orale",
        "duree_jours": 3,
        "debut": ISODate("2026-02-16T00:00:00Z"),
        "fin": ISODate("2026-02-19T00:00:00Z")
    },
    "analyses": {
        "type": "bacteriologie",
        "preleve_le": ISODate("2026-02-16T09:00:00Z"),
        "resultat": "negatif",
        "fichier_url": "/analyses/2026-02-16-resultat.pdf"
    },
    "observations": "Aucun signe de maladie détecté. Les sujets sont actifs et s'alimentent normalement.",
    "prochaine_visite": ISODate("2026-02-23T09:00:00Z"),
    "prochain_traitement": null,
    "couts": {
        "consultation": 25000,
        "traitements": 0,
        "analyses": 15000,
        "total": 40000
    },
    "alertes": 1
});

print("✅ Collection suivis_sanitaires créée");

// =====================================================
// 6. COLLECTION : vaccinations (Vaccination Planning)
// =====================================================
db.vaccinations.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8f1"),
    "code": "VACC001",
    "bande_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d0"),
    "bande_nom": "Bande A - Poulet de Chair",
    "calendar": {
        "numero_sequence": 1,
        "nom": "Primovaccination Newcastle",
        "date_prevue": ISODate("2026-02-20T08:00:00Z"),
        "date_reelle": null,
        "age_jours_prevues": 19,
        "age_jours_reel": null,
        "statut": "planifie"
    },
    "vaccin": {
        "type": "Newcastle",
        "souche": "Lasota",
        "fabricant": "Merial",
        "lot": "LOT2026-001",
        "date_expiration": ISODate("2027-02-20T00:00:00Z"),
        "condition_conservation": "2-8°C"
    },
    "administration": {
        "voie": "eau_boisson",
        "dosage_par_sujet": "2ml",
        "dilution": "1000 doses/10L",
        "duree_administration_heures": 4,
        "responsable_id": ObjectId("67d4f8a1b2c3d4e5f6a7b117"),
        "responsable_nom": "Dr. Kameni",
        "assistants": [ObjectId("67d4f8a1b2c3d4e5f6a7b115")]
    },
    "logistique": {
        "quantite_vaccins": 1000,
        "cout_unitaire": 75,
        "cout_total": 75000,
        "fournisseur_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8c9"),
        "fournisseur_nom": "AgriChick Supplier"
    },
    "suivi": {
        "reaction_observations": null,
        "efficacite_estimee": null,
        "prochaine_rappel": ISODate("2026-03-20T08:00:00Z")
    },
    "notes": "Vaccination de routine",
    "date_creation": ISODate("2026-02-10T14:00:00Z"),
    "date_modification": ISODate("2026-02-10T14:00:00Z"),
    "created_by": ObjectId("67d4f8a1b2c3d4e5f6a7b117")
});

print("✅ Collection vaccinations créée");

// =====================================================
// 7. COLLECTION : ventes (Sales)
// =====================================================
db.ventes.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b900"),
    "code": "VENTE001",
    "facture_numero": "FACT-2026-001",
    "bande_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d0"),
    "bande_nom": "Bande A - Poulet de Chair",
    "client": {
        "id": ObjectId("67d4f8a1b2c3d4e5f6a7b911"),
        "type": "professionnel",
        "nom": "Restaurant La Perle",
        "contact_principal": {
            "nom": "M. Ngono",
            "telephone": "+237699123456",
            "email": "contact@laperle.com"
        },
        "adresse": {
            "ville": "Douala",
            "quartier": "Bonanjo",
            "bp": "7890"
        }
    },
    "details": {
        "quantite": 150,
        "prix_unitaire": 2500,
        "montant_ht": 375000,
        "tva": 0,
        "montant_ttc": 375000,
        "remise": 0,
        "montant_net": 375000
    },
    "paiement": {
        "mode": "virement",
        "reference": "VIR-2026-002",
        "date_paiement": ISODate("2026-02-16T10:30:00Z"),
        "statut": "paye",
        "montant_paye": 375000,
        "reste_a_payer": 0,
        "echeances": [
            {
                "date_prevue": ISODate("2026-02-16T00:00:00Z"),
                "montant": 375000,
                "date_reelle": ISODate("2026-02-16T10:30:00Z"),
                "statut": "paye"
            }
        ]
    },
    "livraison": {
        "date_prevue": ISODate("2026-02-17T08:00:00Z"),
        "date_reelle": null,
        "adresse": "Douala, Bonanjo, face Hôtel",
        "mode": "transport_manichicks",
        "statut": "programmee",
        "responsable_id": ObjectId("67d4f8a1b2c3d4e5f6a7b118"),
        "responsable_nom": "Paul Atangana",
        "notes": "Livraison prévue le matin"
    },
    "produits": [
        {
            "type": "poulet_chair",
            "categorie": "standard",
            "poids_moyen": 2.1,
            "nombre": 150,
            "prix_unitaire": 2500
        }
    ],
    "documents": {
        "facture_url": "/factures/FACT-2026-001.pdf",
        "bon_livraison_url": "/livraisons/BL-2026-001.pdf",
        "recu_url": "/recus/2026-001.pdf"
    },
    "statut": "payee",
    "notes": "Client satisfait, commande régulière",
    "date_vente": ISODate("2026-02-16T09:00:00Z"),
    "date_creation": ISODate("2026-02-16T09:00:00Z"),
    "date_modification": ISODate("2026-02-16T11:00:00Z"),
    "created_by": ObjectId("67d4f8a1b2c3d4e5f6a7b119")
});

print("✅ Collection ventes créée");

// =====================================================
// 8. COLLECTION : clients (Customers)
// =====================================================
db.clients.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b911"),
    "code": "CLI001",
    "type": "professionnel",
    "categorie": "restaurant",
    "nom": "Restaurant La Perle",
    "nom_contact": "M. Ngono",
    "ice": "ICE12345678",
    "rc": "RC/DLA/2025/001",
    "coordonnees": {
        "telephone1": "+237699123456",
        "telephone2": "+237699123457",
        "email": "contact@laperle.com",
        "site_web": "www.laperle.com"
    },
    "adresse": {
        "ville": "Douala",
        "quartier": "Bonanjo",
        "rue": "Avenue Charles de Gaulle",
        "bp": "7890",
        "localisation_gps": {
            "latitude": 4.0456,
            "longitude": 9.7689
        }
    },
    "commercial": {
        "categorie_prix": "B",
        "conditions_paiement": "comptant",
        "remise_standard": 0,
        "plafond_credit": 1000000,
        "encours": 0,
        "commercial_id": ObjectId("67d4f8a1b2c3d4e5f6a7b119"),
        "commercial_nom": "Marie Nganou"
    },
    "statistiques": {
        "premier_achat": ISODate("2025-01-15T00:00:00Z"),
        "dernier_achat": ISODate("2026-02-16T00:00:00Z"),
        "total_achats": 15,
        "montant_total": 5625000,
        "montant_moyen": 375000,
        "fidelite": "regulier"
    },
    "achats_recents": [
        {
            "vente_id": ObjectId("67d4f8a1b2c3d4e5f6a7b900"),
            "date": ISODate("2026-02-16T00:00:00Z"),
            "montant": 375000,
            "produits": "Poulet chair"
        }
    ],
    "notes": "Client très fidèle, paiement toujours dans les délais",
    "statut": "actif",
    "date_creation": ISODate("2025-01-10T11:00:00Z"),
    "date_modification": ISODate("2026-02-16T11:30:00Z"),
    "created_by": ObjectId("67d4f8a1b2c3d4e5f6a7b119")
});

print("✅ Collection clients créée");

// =====================================================
// 9. COLLECTION : utilisateurs (Users with Roles)
// =====================================================
db.utilisateurs.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b110"),
    "matricule": "EMP001",
    "nom": "Jean",
    "prenom": "Mbarga",
    "email": "j.mbarga@manichicks.com",
    "telephone": "+237699123456",
    "auth": {
        "username": "jmbarga",
        "password_hash": "$2a$10$X9bY8cZ7aW6bV5cU4dT3eR2fQ1gH0ij9kL8mN7bV6cX5zA4sS3dF2gH1jK",
        "reset_token": null,
        "reset_expires": null,
        "last_login": ISODate("2026-02-16T08:30:00Z"),
        "last_ip": "192.168.1.100"
    },
    "role": "A&A",
    "departement": "Direction Générale",
    "permissions": {
        "dashboard": ["read"],
        "bandes": ["read", "write", "delete"],
        "batiments": ["read", "write"],
        "sante": ["read", "write"],
        "ventes": ["read", "write"],
        "fournisseurs": ["read"],
        "utilisateurs": ["read"],
        "rapports": ["read", "generate"]
    },
    "personnel": {
        "date_naissance": ISODate("1985-03-15T00:00:00Z"),
        "lieu_naissance": "Douala",
        "nationalite": "Camerounaise",
        "numero_cni": "10456789",
        "adresse": "Douala, Makepe",
        "situation_matrimoniale": "marié",
        "nombre_enfants": 2
    },
    "professionnel": {
        "poste": "Responsable Production",
        "date_embauche": ISODate("2020-01-10T00:00:00Z"),
        "type_contrat": "CDI",
        "salaire_base": 350000,
        "superieur_id": ObjectId("67d4f8a1b2c3d4e5f6a7b111"),
        "superieur_nom": "Marie Nganou"
    },
    "preferences": {
        "theme": "dark",
        "langue": "fr",
        "notifications_email": true,
        "notifications_push": true,
        "dashboard_layout": 0
    },
    "activite": {
        "derniere_action": ISODate("2026-02-16T15:45:00Z"),
        "actions_aujourdhui": 25,
        "total_connexions": 456,
        "temps_moyen_session": 45
    },
    "statut": "actif",
    "date_creation": ISODate("2020-01-01T09:00:00Z"),
    "date_modification": ISODate("2026-02-16T15:45:00Z")
});

print("✅ Collection utilisateurs créée");

// =====================================================
// 10. COLLECTION : alertes (Alerts)
// =====================================================
db.alertes.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b920"),
    "code": "ALERT001",
    "type": "temperature",
    "severite": "warning",
    "source": {
        "type": "capteur",
        "reference_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d1"),
        "reference_nom": "Bâtiment A",
        "capteur_id": "TEMP001"
    },
    "message": "Température élevée dans le bâtiment A",
    "description": "La température a dépassé le seuil critique de 32°C (actuelle: 33.5°C)",
    "valeurs": {
        "actuelle": 33.5,
        "seuil_min": 18,
        "seuil_max": 32,
        "unite": "C"
    },
    "date_declenchement": ISODate("2026-02-16T14:30:00Z"),
    "date_resolution": null,
    "traitement": {
        "statut": "en_cours",
        "actions_prises": [
            {
                "action": "Augmentation ventilation",
                "utilisateur_id": ObjectId("67d4f8a1b2c3d4e5f6a7b110"),
                "utilisateur_nom": "Jean Mbarga",
                "date": ISODate("2026-02-16T14:35:00Z"),
                "commentaire": "Ventilation augmentée à 80%"
            }
        ]
    },
    "resolue_par": null,
    "commentaire_resolution": null,
    "destinataires": [
        {
            "utilisateur_id": ObjectId("67d4f8a1b2c3d4e5f6a7b110"),
            "utilisateur_nom": "Jean Mbarga",
            "lu": true,
            "date_lecture": ISODate("2026-02-16T14:32:00Z")
        },
        {
            "utilisateur_id": ObjectId("67d4f8a1b2c3d4e5f6a7b111"),
            "utilisateur_nom": "Dr. Kameni",
            "lu": false,
            "date_lecture": null
        }
    ],
    "date_creation": ISODate("2026-02-16T14:30:00Z")
});

print("✅ Collection alertes créée");

// =====================================================
// 11. COLLECTION : rapports (Reports)
// =====================================================
db.rapports.insertOne({
    "_id": ObjectId("67d4f8a1b2c3d4e5f6a7b930"),
    "code": "RPT001",
    "type": "production",
    "titre": "Rapport de production mensuel - Février 2026",
    "periode": {
        "debut": ISODate("2026-02-01T00:00:00Z"),
        "fin": ISODate("2026-02-29T23:59:59Z"),
        "type": "mensuel"
    },
    "parametres": {
        "bandes_incluses": ["all"],
        "batiments_inclus": ["all"],
        "indicateurs": ["production", "mortalite", "consommation", "financier"]
    },
    "resume": {
        "production": {
            "total_sujets_produits": 850,
            "poids_total_produit": 1785,
            "taux_croissance_moyen": 85.3
        },
        "sanitaire": {
            "mortalite_totale": 15,
            "taux_mortalite": 1.5,
            "vaccinations_effectuees": 3
        },
        "financier": {
            "chiffre_affaires": 1725000,
            "cout_production": 1201875,
            "marge_nette": 523125,
            "rentabilite": 30.3
        }
    },
    "metriques": {
        "par_bande": [
            {
                "bande_id": ObjectId("67d4f8a1b2c3d4e5f6a7b8d0"),
                "bande_nom": "Bande A",
                "production": 500,
                "mortalite": 1.5,
                "ic": 1.85
            }
        ]
    },
    "date_generation": ISODate("2026-02-16T16:00:00Z"),
    "genere_par": ObjectId("67d4f8a1b2c3d4e5f6a7b110"),
    "fichier_url": "/rapports/RPT001.pdf",
    "statut": "genere"
});

print("✅ Collection rapports créée");

// =====================================================
// 12. CRÉATION DES INDEX
// =====================================================
print("\n📊 Création des index...");

db.donnees_capteurs.createIndex({ "batiment_id": 1, "timestamp": -1 });
db.donnees_capteurs.createIndex({ "capteur_id": 1, "timestamp": -1 });
db.donnees_capteurs.createIndex({ "timestamp": -1 });

db.bandes.createIndex({ "date_installation": -1 });
db.bandes.createIndex({ "fournisseur_id": 1 });
db.bandes.createIndex({ "effectif_actuel": 1 });

db.batiments.createIndex({ "statut": 1 });
db.batiments.createIndex({ "type": 1 });

db.ventes.createIndex({ "date_vente": -1 });
db.ventes.createIndex({ "client.id": 1 });
db.ventes.createIndex({ "statut": 1 });

db.suivis_sanitaires.createIndex({ "bande_id": 1, "date": -1 });
db.suivis_sanitaires.createIndex({ "type": 1, "date": -1 });

db.alertes.createIndex({ "date_declenchement": -1 });
db.alertes.createIndex({ "severite": 1, "traitement.statut": 1 });

db.utilisateurs.createIndex({ "email": 1 }, { unique: true });
db.utilisateurs.createIndex({ "auth.username": 1 }, { unique: true });

db.fournisseurs.createIndex({ "statut": 1 });
db.fournisseurs.createIndex({ "evaluation.note_moyenne": -1 });

db.clients.createIndex({ "code": 1 }, { unique: true });
db.clients.createIndex({ "statistiques.dernier_achat": -1 });

db.vaccinations.createIndex({ "bande_id": 1 });
db.vaccinations.createIndex({ "calendar.date_prevue": 1 });

print("\n✅ Tous les index ont été créés avec succès !");
print("✅ Base de données ManiChicks prête à l'emploi !");
print("\n📋 Liste des collections créées:");
print(db.getCollectionNames().join("\n"));
