# Usa una versión más reciente de Node
FROM node:20-alpine

WORKDIR /app

# <- esta línea desactiva la instalación del binario nativo de esbuild
ENV ESBUILD_BINARY_PATH=/dev/null

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]

