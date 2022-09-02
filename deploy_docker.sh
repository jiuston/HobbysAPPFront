#!/usr/bin/env bash
echo "------Deploying Angular App for Hobbys------"

docker build -t personalhobbysapp .

docker stop hobbys-front

docker remove hobbys-front

docker run -d --name hobbys-front -p 4500:80 personalhobbysapp

echo "------Deploy complete------"

echo "check http://localhost:4500 on your browser"