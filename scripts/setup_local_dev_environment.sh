#!/bin/bash

#pipe output to log while also printing it to terminal
exec > >(tee log.txt)

#Greet the user.
printf "Hello, $USER! \n\n"

#Description of the script.
printf "This is an installation script for git and node on your $OSTYPE system!\n\n"

#Storing date and time at the beginning of installation
begin=$(date)

#Display date and time of installation
printf "Beginning installation at: $begin\n\n"

printf "Installing git...\n"

#update apt-get
sudo apt-get update

#install git
sudo apt-get install git

#fetching Node files
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

#install nodejs
sudo apt install -y nodejs

#download AWS CLI version 1
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"

#unzip the bundle
unzip awscli-bundle.zip

#run the AWS CLI installer
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

#Storing date and time at the end of installation
end=$(date)

#Display date and time of installation end
printf "Installation finished at: $end\n\n"

printf "Successfully installed following versions:\n"


#print out versions for all installed applications
git --version

#version commands for Node and npm aren't descriptive enough
printf "Node "
node --version

printf "npm "
npm --version

aws --version