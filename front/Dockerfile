# ============ STAGE 1 : Build React ============
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# ============ STAGE 2 : Serveur Nginx ============
FROM nginx:alpine

# Remplacer la config Nginx par defaut
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers statiques compiles
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]