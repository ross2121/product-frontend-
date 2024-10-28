FROM node:20
WORKDIR /src/app
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
