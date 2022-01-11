FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

ENV PORT=9090

EXPOSE 9090
CMD [ "npm", "run", "dev" ]