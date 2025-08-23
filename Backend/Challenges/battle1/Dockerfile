FROM ubuntu:latest

# Install necessary tools
RUN apt-get update && apt-get install -y sudo gcc make

# Create a non-root user
RUN useradd -m challengeuser
RUN echo "challengeuser:challengeuser" | chpasswd
RUN usermod -aG sudo challengeuser

# Create the vulnerable program
COPY vulnerable_program.c /home/challengeuser/vulnerable_program.c

# Compile the vulnerable program
RUN su - challengeuser -c "gcc /home/challengeuser/vulnerable_program.c -o /home/challengeuser/vulnerable_program"

# Set SUID bit on the vulnerable program
RUN chmod +s /home/challengeuser/vulnerable_program

# Set up a script to be run as root
COPY root_script.sh /root/root_script.sh
RUN chmod +x /root/root_script.sh

# Switch to the non-root user
USER challengeuser

# Expose port (optional, for potential network access)
EXPOSE 8000

WORKDIR /home/challengeuser
CMD ["/bin/bash"]
