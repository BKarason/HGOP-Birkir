#!/bin/bash

#Greet the user.
printf "Hello, $USER! \n\n"

#Description of the script.
printf "This is an installation script for git and node on your $OSTYPE system!\n\n"

#Storing date and time at the beginning of installation
begin=$(date)

#Display date and time of installation
printf "Beginning installation at: $begin\n\n"

#Storing date and time at the end of installation
end=$(date)

#Display date and time of installation end
printf "Installation finished at: $end\n\n"