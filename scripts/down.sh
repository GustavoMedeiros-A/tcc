#!/bin/bash

docker compose down -v

docker container prune -f

docker volume prune -f

docker network prune -f

echo "Containers, volumes, e redes removidos."