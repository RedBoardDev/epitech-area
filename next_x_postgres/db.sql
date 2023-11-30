-- Supprimer la base de données si elle existe déjà
DROP DATABASE IF EXISTS area;

-- Créer la base de données
CREATE DATABASE area;

-- Utiliser la base de données nouvellement créée
\c area;

-- Créer la table "user"
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
