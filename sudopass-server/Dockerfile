FROM node:16-alpine AS development

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY --chown=node:node . .

RUN npm run build

FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY ../package*.json .

RUN npm install

COPY .. .

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
