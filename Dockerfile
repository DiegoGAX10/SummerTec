# Usa una imagen base adecuada
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos y dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto correcto
EXPOSE 5173

# Comando para iniciar Vite en modo producción o desarrollo
CMD ["npm", "run", "dev"]
