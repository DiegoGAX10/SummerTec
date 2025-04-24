FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

USER root
RUN npm install

COPY . .

CMD ["npm", "start"]
