# SUID Misconfiguration Challenge

## Description

This challenge demonstrates a common security vulnerability: an SUID executable that allows a user to execute commands as another user (in this case, root) due to a misconfiguration and insecure use of `system()` and shell script execution.  The vulnerable program takes user input and passes it as an argument to a root-owned script which then executes the input. This allows a low-privileged user to potentially execute arbitrary commands as root.

## Build and Run

1.  Build the Docker image: `docker build -t [imagename] .`
2.  Run the Docker container: `docker run -it -p 8000:8000 [imagename]`

## Vulnerability Explanation

The vulnerability lies in the combination of the following factors:

*   **SUID bit set on `vulnerable_program`:** This allows the program to be executed with the privileges of the file owner (root in this case), regardless of who runs it.
*   **Insecure use of `system()` in `vulnerable_program.c`:** The program takes user input and constructs a command string that includes the input. This command string is then passed to the `system()` function, which executes it as a shell command.  This creates a command injection vulnerability.
*   **Insecure execution in `root_script.sh`:** The `root_script.sh` script receives user input as an argument and directly executes it without any sanitization or validation.

## Exploitation

To exploit this vulnerability, you can use the following steps:

1.  Run the `vulnerable_program` executable inside the Docker container.
2.  Enter a command as input that you want to execute as root. For example, you can enter `id` to see the effective user ID, or `cat /etc/shadow` to try to read the shadow file (though modern systems may prevent this). A simple example to gain a shell would be  `sh` or `/bin/sh`. More advanced techniques may require escaping or chaining commands.

**Example:**
