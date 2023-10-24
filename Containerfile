FROM registry.access.redhat.com/ubi8/nodejs-18

# RUN mkdir -p /usr/src/app
WORKDIR /opt/app-root/src

# COPY package.json /usr/src/app/
# RUN npm install --omit=dev

# creating an inline package.json for speed and laziness:)
RUN npm i express@4 --save
RUN npm i firebase-admin --save

COPY dist /opt/app-root/src/public
COPY server.js /opt/app-root/src/

EXPOSE 3000

CMD node server.js