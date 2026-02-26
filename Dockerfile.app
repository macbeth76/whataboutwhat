FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY angular.json tsconfig*.json ./
COPY src/ ./src/
COPY public/ ./public/
COPY scripts/ ./scripts/

ARG GIT_HASH=dev
RUN GIT_HASH=${GIT_HASH} sh ./scripts/set-version.sh

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
