## Prerequisites

This environnment runs in Docker so make sure you have Docker and its' dependencies installed on your machine. https://docs.docker.com/get-docker/

## Getting started

1. Copy the contents of .env.example into a new file named .env.
2. Run `docker compose up` to start the Node server and the MongoDB.
3. Try out the features either by querying the API directly through `localhost:3000/api` and/or via the React client that is included and hosted statically on `localhost:3000`.

## Tools

In this project I've used tools like `Mongoose` as an ODM for modelling and querying the Mongo database, `Express` to handle the API middleware side of things, `ts-node` to transcompile the Typescript code, the `create-react-app` CLI tool to generate a placeholder React application, and more...

## Notes

Some obvious stuff is missing from this very limited demo, some are:

- Tests
- User session handling
- Request body validation in the API
- Request authentication and authorization in the API
- ...loads more

## IaC section

To demonstrate the IaC part of the assignment, I have created a basic .tf file which contains the absolute minimum to set up a GKE cluster. I also created kubernetes manifest files for each service. These can be found in the project root inside the `infra` folder. For the sake of the assignment this configuration assumes the use of a self-managed MongoDB instance and not a managed database service such as Atlas och GCP's Cloud MongoDB.
