FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY index.html ./
COPY server ./server
USER node
ENV NODE_ENV=production
CMD ["node", "server/index.mjs"]
