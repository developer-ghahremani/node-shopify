FROM node:18-alpine


COPY ./packege.json .

RUN npm install

COPY . .

RUN tsc

CMD [ "npm","run", "start" ]


