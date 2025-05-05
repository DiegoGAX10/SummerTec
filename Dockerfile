# Usa la versión específica de Node.js
FROM node:22.14.0

WORKDIR /app

COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expón el puerto que Vite usará
EXPOSE 5173

CMD ["npm", "run", "dev"]