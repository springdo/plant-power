# plant-power
Mickey mouse project to do push notifications on devices.... Using firebase + Vuejs + NodeJS

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## OCP Deploy steps:
1. Build the Frontend 
```bash
npm run build
```

2. Build server & add Front end to container
```bash
podman build -t quay.io/springdo/plant-power:latest --arch=amd64 . 
```

3. push to registry 
```bash
podman login quay.io -u springdo
podman push quay.io/springdo/plant-power:latest
```

4. On ocp 
``