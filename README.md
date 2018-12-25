# Project 21

This repo holds the web app for Project 21, a low-cost gait-tracking and analysis solution for physiotherapists and doctors.
The web app aims to allow users (doctors) to easily monitor their patients' gait patterns and diagnose them by providing an easy way to
collect, display and analyze the data collected by the gait-tracking devices worn by the patients.


# AWS ECS CLI Configuration 

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html

```
$ ecs-cli configure profile --profile-name p21-ecs --access-key $AWS_KEY --secret-key $AWS_KEY
$ ecs-cli configure --region ap-southeast-1 --cluster default --default-launch-type FARGATE --config-name p21-default
```

```
$ ecs-cli compose --file docker-compose.ecs.yml --project-name project21 service up --create-log-groups --cluster-config p21-default
```

Update: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/update-service.html
