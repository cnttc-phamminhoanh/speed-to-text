# Speed-To-Text
## Requirement:
- Install docker to start services
## Build & start services:
- Create *.env.docker* file at the same level as docker-compose.yml file
- Copy environment variables from *env.docker.example* file to *.env.docker* file
- Run command: `docker compose --env-file .env.docker up --build -d`
