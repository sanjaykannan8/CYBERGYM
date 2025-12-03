FROM ubuntu:latest

WORKDIR /app

# Install necessary tools
RUN apt-get update && apt-get install -y sudo vim

# Copy the scripts
COPY vulnerable_script.sh .
COPY exploit.sh .

# Set up the vulnerable script with incorrect permissions
RUN chmod 744 vulnerable_script.sh
RUN chown root:root vulnerable_script.sh

# Create a non-root user
RUN useradd -m attacker
RUN echo "attacker:password" | chpasswd
RUN usermod -aG sudo attacker

# Set up the environment for the attacker
USER attacker
WORKDIR /home/attacker

# Provide hints in the home directory
RUN echo "Try running ./vulnerable_script.sh" > hint.txt

CMD ["/bin/bash"]
