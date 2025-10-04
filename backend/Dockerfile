FROM node:20-alpine
WORKDIR /app

# copy package trước để cache layer dependency
COPY package*.json ./
RUN npm ci --omit=dev

# copy source
COPY src ./src

EXPOSE 3000
CMD ["node", "src/index.js"]
