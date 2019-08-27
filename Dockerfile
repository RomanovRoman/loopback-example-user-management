FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python git bash
RUN npm config set unsafe-perm true
RUN npm install --quiet node-gyp -g

RUN npm install --only=production --quiet --no-cache git

RUN apk del native-deps

CMD ["node", "."]
