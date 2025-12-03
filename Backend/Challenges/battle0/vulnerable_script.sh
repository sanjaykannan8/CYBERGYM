#!/bin/bash

# This script is intentionally vulnerable for privilege escalation practice.
# It's owned by root and has weak permissions.
# DO NOT USE THIS SCRIPT IN A PRODUCTION ENVIRONMENT.

# Get user input
echo "Enter a command:"
read command

# Execute the command as root.  This is where the vulnerability lies.
$command
