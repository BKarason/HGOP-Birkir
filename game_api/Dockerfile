#Specifying base for the container
FROM node:erbium

#Set the working directory to /code
WORKDIR /code

#Copying the package file from local directory into /code
COPY package.json package.json

#Excecute install command of the package manager
RUN npm install --production

#Copying all .js files from local directory into /code
COPY *.js ./

#Launch the process
CMD node app.js