# Use AWS as the provider and location of credentials
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# Create security group named game_security_group and open
# ports for incoming and outgoing traffic
resource "aws_security_group" "game_security_group" {
  name = "GameSecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create instance of AWS named game_server using the provided
# Ubuntu 18.04 LTS of type micro Amazon Machine Image.
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = [aws_security_group.game_security_group.id]
  tags = {
    Name = "GameServer"
  }

  # Copy initialize_game_api_instance script from local machine
  # To the AWS instance through a ssh connection
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # Copy docker-compose file from local machine
  # To the AWS instance through a ssh connection
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  # Give the initialize_game_api_instance script executeble permission so it can be run
  # on the AWS instance
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
    ]

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
}

# Output the public ip of the AWS instance running the API
output "public_ip" {
  value = aws_instance.game_server.public_ip
}