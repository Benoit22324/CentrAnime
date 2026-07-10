# Initialisation du projet
## Clone du projet
Pour initialiser le projet, il faudra d'abord faire un clone en local.
```bash
git clone https://github.com/Benoit22324/CentrAnime.git
```
## Installation des dépendances
Lorsque le projet sera cloné sur votre appareil local, il faudra installer les dépendances du front et du back.  
Initialisons le front, puis le back.
```bash
cd ./front
npm install
```
```bash
cd ./back         # cd ../back à partir du dossier front
npm install
```
N'oubliez pas de mettre en place votre .env pour le back.
## Initialisation de la base de donnée
Pour initialiser la base de donnée, il faudra avoir Docker Desktop d'ouvert.  
Lorsque c'est fait, il faudra lancer les builds d'images Docker à la racine du projet.
```bash
docker compose up --build -d
```
Puis lorsqu'elle est faite, allez dans le dossier back puis initialiser Prisma.
```bash
npx prisma generate
npx prisma migrate deploy
```
## Problèmes possibles durant l'initialisation du projet
Lorsque vous initialiserez en local, veuillez vérifier que toutes les URL des fichiers dans le dossier adapters/data/api du front sont mises sur localhost:8000 et pareil pour les URL dans le .env du backend.   

Si vous initialisez sur Docker uniquement, vérifiez bien d'avoir mis en place le .env dans le dossier back et qu'à la place de localhost, vous êtes bien en train d'utiliser le nom du conteneur situé dans le docker-compose.yml