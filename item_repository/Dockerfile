#Specifying base for the container
FROM node:erbium

#Set the working directory to /code
WORKDIR /code

#Copying the package file from local directory into /code
COPY package.json package.json

#Excecute install command of the package manager
RUN npm install

#Copying the database file from local directory into /code
COPY database.js database.js

#Copying the app file from local directory into /code
COPY app.js app.js

#Launch the process
CMD node app.js