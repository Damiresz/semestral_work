FROM node:22.7-alpine3.19

WORKDIR /usr/src/app
RUN apk add --no-cache curl
COPY package*.json ./

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start" ]