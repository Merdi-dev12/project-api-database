# Rapport de Projet – API de Gestion de Groupes

## 1. Introduction
Ce projet vise à concevoir une API RESTful permettant de gérer des groupes, leurs membres, rôles, activités et participations. Il illustre les principes de la programmation orientée objet (POO) et suit une architecture MVC.

## 2. Modélisation des données
### Schéma relationnel
- groupes (id, nom, description)
- membres (id, nom, email, groupe_id, role)
- activites (id, titre, date_activite, groupe_id)
- participations (id, membre_id, activite_id, present)

### Schéma UML (à dessiner)
Classes : Groupe, Membre, Activite, Participation
Associations :
- Groupe 1 — * Membre
- Groupe 1 — * Activite
- Membre * — * Activite (via Participation)

## 3. Description des routes

### Groupes
- GET /api/groupes → liste tous les groupes
- POST /api/groupes → crée un groupe
  - Entrée : { "nom": "Dev", "description": "..." }
  - Sortie : { "id": 1, "nom": "Dev", ... }

### Membres
- POST /api/membres
  - Entrée : { "nom": "Merdi", "email": "...", "groupe_id": 1, "role": "Responsable" }
  - Sortie : membre créé

### Activités & Participations
- POST /api/activites → crée une activité
- POST /api/activites/participations → inscrit un membre
- PATCH /api/activites/participations/1/present → marque comme présent

## 4. Classes orientées objet
Chaque entité est une classe JavaScript avec :
- Constructeur
- Méthodes statiques : getAll(), create(), etc.
- Interaction via la couche modèle

## 5. Bilan
- Contribution de chaque membre (à remplir)
- Difficultés : configuration WAMP, relations SQL, async/await
- Apprentissages : POO en JS, MVC, REST API