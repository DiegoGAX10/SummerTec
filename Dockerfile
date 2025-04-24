# Usa Node 20 para compatibilidad con tus paquetes
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Si usas paquetes privados, incluye tu .npmrc con autenticación
# COPY .npmrc .npmrc

# Instalar dependencias y borrar .npmrc si se usó
RUN npm install
# RUN npm install && rm -f .npmrc

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando para iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev"]
