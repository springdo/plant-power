FROM registry.access.redhat.com/ubi8/nodejs-18

WORKDIR /opt/app-root/src

RUN npm i express@4 --save

COPY server.js /opt/app-root/src

EXPOSE 3000

COPY dist /opt/app-root/src/public

CMD node server.js