FROM node:18

WORKDIR /usr/src/app

COPY document-manager/package*.json ./

RUN npm install --legacy-peer-deps

COPY document-manager/ .

EXPOSE 4200

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
