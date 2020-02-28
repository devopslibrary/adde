# ADDE - Automated Declarative Data Engine

## Backend

## Frontend

## Gateway

Gateway is an Nginx container fronting ADDE.  It provides swagger, as well as 
routing everything properly between frontend and backend.  I have customized
the Swagger index.html SLIGHTLY so that it generates the config.json URL
dynamically.