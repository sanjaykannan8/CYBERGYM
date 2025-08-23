#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    char command[100];
    char input[50];

    printf("Enter command (max 50 characters): ");
    fgets(input, sizeof(input), stdin);

    // Remove newline character
    for (int i = 0; input[i] != '\0'; i++) {
        if (input[i] == '\n') {
            input[i] = '\0';
            break;
        }
    }

    // Vulnerability: Insecure use of system() with user-provided input.
    snprintf(command, sizeof(command), "/root/root_script.sh %s", input);

    printf("Executing: %s\n", command);
    system(command); // VERY BAD PRACTICE!

    return 0;
}
