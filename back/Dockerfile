# ============ STAGE 1 : Build ============
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY ./prisma/schema.prisma ./prisma

RUN npx prisma generate

RUN npm run build

# ============ STAGE 2 : Production ============
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 8000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node ./dist/src/api/app.js"]