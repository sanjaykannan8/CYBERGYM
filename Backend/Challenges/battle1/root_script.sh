#!/bin/bash
# This script is intended to be run as root.

if [ -n "$1" ]; then
    echo "Executing with argument: $1"
    $1  # Vulnerability: Executing user-provided input as root!
else
    echo "No argument provided."
fi
