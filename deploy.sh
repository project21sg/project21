#!/bin/bash

if [[ -z "$1" ]]; then
    key="$1"
else
    key='C:\Keys\project21-instance.pem'
fi

ssh -A "ubuntu@18.136.119.129" "cd main
    docker-compose stop
    git checkout master
    git pull --rebase
    docker-compose up -d"
