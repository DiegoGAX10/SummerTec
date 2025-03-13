FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
