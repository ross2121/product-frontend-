FROM node:20
WORKDIR /src/app
COPY package*.json .
COPY ./prisma .
RUN npm install --force
RUN npx prisma generate
COPY . .
RUN npm run build 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
