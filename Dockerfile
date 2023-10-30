FROM --platform=linux/amd64 node:18.16.1-slim AS builder

ARG APP_ENV

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN NEXT_PUBLIC_APP_ENV=$APP_ENV npm run build

FROM --platform=linux/amd64 node:18.16.1-slim

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/src/config ./src/config
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
