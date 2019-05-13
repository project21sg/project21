# Project 21

This repo holds the web app for Project 21, a low-cost gait-tracking and analysis solution for physiotherapists and doctors.
The web app aims to allow users (doctors) to easily monitor their patients' gait patterns and diagnose them by providing an easy way to
collect, display and analyze the data collected by the gait-tracking devices worn by the patients.

## Local Development Setup

### Running Client Frontend

Run `yarn start` in the /client directory.
Do `yarn build` to create the production ready build.

### Running Server Backend

Run `node app.js` in the /server directory.
Install `nodemon` globally for development and run `nodemon app.js` to automatically reload the server when the watched files are changed.

### Running Database Backend

You will need to install `sequelize` and `nodemon` globally via `sudo npm i -g sequelize nodemon`.
You also need to have a PostgreSQL database instance, `sudo apt-get install postgresql-10`.

Run `sequelize db:create`.

If on WSL, you can choose to install PostgreSQL on Windows and create the necessary databases and roles, then connect to that instance via `psql p21_development p21-admin -h localhost`.
You may also need to open the ports via the firewall settings to allow inbound connections, if developing locally.

### Docker WSL Setup

If running on WSL, then you can follow this guide to get your `docker` setup properly.
https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly

Before installing `docker-compose`, ensure you have login to Docker already.
https://github.com/docker/compose/issues/6023

For the part on installing `docker-compose`, you may need to refer to this guide instead.
https://docs.docker.com/compose/install/#alternative-install-options
Do not install compose with `apt` otherwise you will face login issues.

Login via `docker login` with your docker ID (not your email).

### AWS ECS CLI Configuration

Follow installation instructions as per these guides.

DO NOT run this unless you need to recreate the ECS instance/services! Doing otherwise will cause the public IP to be refreshed, which means you need to change the DNS host records on wix.com!

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html

Get the keys from AWS -> Security Credentials. Use IAM credentials.

```
$ ecs-cli configure profile --profile-name p21-ecs --access-key $AWS_KEY --secret-key $AWS_KEY
$ ecs-cli configure --region ap-southeast-1 --cluster default --default-launch-type FARGATE --config-name p21-default
```

```
$ ecs-cli compose --file docker-compose.ecs.yml --project-name project21 service up --create-log-groups --cluster-config p21-default
OR
$ ecs-cli compose --file docker-compose.ecs.yml --project-name project21 service up --cluster-config p21-default
```

To get the public-IP of the ECS service, go to clusters -> <cluster> -> <service> -> task -> <running task>.

## Deployment

You need to push the latest docker images for `client` and `server` to Docker hub, then pull the images on AWS.
Make sure you build the images to the latest version first before pushing.
Run `docker build . -t project21/webapp:app-client` to build the image in the client directory.
Run `docker build . -t project21/webapp:app-server` to build the image in the server directory.

Run `docker push project21/webapp:app-client` in the client directory.
Run `docker push project21/webapp:app-server` in the server directory.

NOTE: AWS ECS somehow prefers `localhost` instead of `postgres` or container names like Docker does. You need to rename the host address in the server's config files to localhost before doing the above.

### Updating new Instance of Webapp

Update: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/update-service.html

### Troubleshooting

If receiving `TimeoutError: ResourceRequest timed out`, it most likely means that the server is having trouble connecting to the databases. Make sure they are up and running. Otherwise, it may mean that the server/db is overloaded and can't respond to requests quickly enough.

If using WSL and cannot start local `postgresql` service in WSL, you can install postgres on Windows, then access the db by running e.g. `psql -p 5432 -h localhost -U postgres`.
