FROM node:22.3.0

WORKDIR /home/web

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]