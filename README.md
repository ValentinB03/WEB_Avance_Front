# Gestion de Commandes - Application React

## Description
Cette application est une plateforme de gestion de commandes pour les restaurants, livreurs et clients. Elle permet aux utilisateurs de s'inscrire, de gérer leurs profils, de passer des commandes, de suivre leur statut et d'accéder à des statistiques.

## Fonctionnalités
### Pour les clients :
- Inscription et connexion.
- Modification du profil (nom, email, adresse, etc.).
- Passer des commandes auprès des restaurants.
- Suivi des commandes en cours et historique des commandes.

### Pour les restaurateurs :
- Gestion des commandes (en attente, en cours, prêtes, annulées).
- Modification du profil et ajout d'une bannière pour le restaurant.
- Visualisation des statistiques des commandes et du chiffre d'affaires.

### Pour les livreurs :
- Gestion des commandes à livrer.
- Modification du profil (nom, email, IBAN, etc.).
- Suivi des commandes livrées et en cours.

### Notifications :
- Les utilisateurs reçoivent des notifications personnalisées.

## Technologies utilisées
- **Frontend** : React, CSS (styles personnalisés).
- **Backend** : API REST (proxy configuré dans `vite.config.js`).
- **Outils** : Vite, React Router, LocalStorage.

## Installation
1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_PROJET>

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez le proxy pour l'API dans vite.config.js si nécessaire.

4. Lancez le projet en mode développement :
```bash
npm run dev
```

5. Accédez à l'application via http://localhost:5173.


### Structure du projet
- src/ : Contient tous les fichiers source.
- Navbar/ : Composant de navigation.
- Footer/ : Composant de pied de page.
- Compte/ : Gestion des comptes (connexion, inscription, etc.).
- Restaurant/ : Gestion des commandes pour les restaurateurs.
- Livreur/ : Gestion des commandes pour les livreurs.
- client/ : Gestion des profils et commandes pour les clients.
- notification/ : Gestion des notifications.
- api/ : Fichiers pour les appels API.
- assets/ : Images et ressources statiques.


### Scripts disponibles
- npm run dev : Lance l'application en mode développement.
- npm run build : Génère une version de production.
- npm run preview : Prévisualise la version de production.

### Configuration du backend
Le backend est configuré pour fonctionner sur http://localhost:8080. Assurez-vous que le serveur backend est opérationnel avant de lancer l'application.