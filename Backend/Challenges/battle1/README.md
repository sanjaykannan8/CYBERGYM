# SQL Injection Vulnerable Blog

## Description
This application is a simple blog vulnerable to SQL injection. The vulnerability exists in the `post`, `edit_post`, and `delete_post` routes where user-supplied `post_id` is directly used in the SQL query without proper sanitization or parameterization.

## Build and Run Instructions

1.  Build the Docker image:
