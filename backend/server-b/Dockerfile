# This is where you define the image for
# the server B which processes the orders.

# You should then use Noje image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

#FROM node:version...

# Dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "src/app.js"]
