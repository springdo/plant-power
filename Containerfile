FROM registry.access.redhat.com/ubi8/nodejs-18

WORKDIR /opt/app-root/src

RUN npm i express@4 --save

COPY server.js /usr/app

EXPOSE 3000

COPY dist /usr/app/public

CMD node server.js