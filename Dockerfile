FROM node:slim

ENV PORT=3000

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY client ./client

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
