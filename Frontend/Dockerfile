FROM node:22.3.0

WORKDIR /home/web

COPY package*.json ./

RUN npm install

RUN npm install next

COPY . .

CMD ["npm", "run", "dev"]