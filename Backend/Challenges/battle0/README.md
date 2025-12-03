# Linux Privilege Escalation Basics Challenge

## Description

This challenge provides a basic environment for practicing Linux privilege escalation techniques. A vulnerable script, `vulnerable_script.sh`, is owned by root and has weak permissions.  The goal is to exploit this script to gain root access.

## Vulnerability

The `vulnerable_script.sh` script executes commands as root. Due to its permissions, a non-root user can influence what commands are executed. This can be exploited to gain root privileges.

## Exploitation

1.  Log in as the `attacker` user (password: `password`).
2.  Examine `vulnerable_script.sh` to identify the vulnerability.
3.  Craft an exploit using `exploit.sh` that leverages the vulnerability to gain root access.
4.  Run the exploit.

## Build and Run

1.  Build the Docker image: `docker build -t challenge_container .`
2.  Run the container: `docker run -it challenge_container`

## Learning Objectives

*   Understanding file permissions in Linux.
*   Identifying and exploiting vulnerabilities in scripts run with elevated privileges.
*   Basic privilege escalation techniques.
