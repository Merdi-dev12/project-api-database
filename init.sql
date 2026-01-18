CREATE DATABASE IF NOT EXISTS groupe_membres CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE groupe_membres;

CREATE TABLE groupes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT
) ENGINE=InnoDB;

CREATE TABLE membres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  groupe_id INT,
  role ENUM('Responsable', 'Secrétaire', 'Membre actif') NOT NULL DEFAULT 'Membre actif',
  FOREIGN KEY (groupe_id) REFERENCES groupes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE activites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  date_activite DATETIME,
  groupe_id INT,
  FOREIGN KEY (groupe_id) REFERENCES groupes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE participations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membre_id INT,
  activite_id INT,
  present BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (membre_id) REFERENCES membres(id) ON DELETE CASCADE,
  FOREIGN KEY (activite_id) REFERENCES activites(id) ON DELETE CASCADE,
  UNIQUE(membre_id, activite_id)
) ENGINE=InnoDB;