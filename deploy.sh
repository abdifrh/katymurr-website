#!/bin/bash

# Script de déploiement automatique
# Usage: ./deploy.sh

set -e  # Arrêter en cas d'erreur

echo "🚀 Démarrage du déploiement..."

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variables (à adapter selon votre configuration)
PROJECT_DIR="/var/www/katymurr"
APP_NAME="katymurr-api"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json introuvable. Êtes-vous dans le répertoire du projet ?${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installation des dépendances...${NC}"

# Installer les dépendances à la racine
npm install

# Installer les dépendances du serveur
echo -e "${YELLOW}📦 Installation des dépendances du serveur...${NC}"
cd server
npm install
cd ..

# Installer les dépendances du client
echo -e "${YELLOW}📦 Installation des dépendances du client...${NC}"
cd client
npm install
cd ..

# Build du frontend
echo -e "${YELLOW}🏗️  Build du frontend...${NC}"
cd client
npm run build
cd ..

# Vérifier si PM2 est installé
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 Installation de PM2...${NC}"
    sudo npm install -g pm2
fi

# Redémarrer ou démarrer l'application
echo -e "${YELLOW}🔄 Redémarrage de l'application...${NC}"
cd server

if pm2 list | grep -q "$APP_NAME"; then
    echo -e "${GREEN}✅ Application trouvée, redémarrage...${NC}"
    pm2 restart "$APP_NAME"
else
    echo -e "${GREEN}✅ Nouvelle application, démarrage...${NC}"
    pm2 start index.js --name "$APP_NAME"
    pm2 save
fi

cd ..

echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
echo -e "${YELLOW}📊 Statut de l'application :${NC}"
pm2 status

echo -e "${YELLOW}📝 Logs récents :${NC}"
pm2 logs "$APP_NAME" --lines 20 --nostream

