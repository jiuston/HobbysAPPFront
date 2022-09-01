#!/usr/bin/env bash
echo "Deploying HobbysAppFront in Docker"
echo "------Building Angular App------"
npm ci
rm -rf ./dist/personalhobbysapp
npm run build

echo "------Building image------"
docker-compose build

docker-compose down

docker-compose up -d

docker restart nginx