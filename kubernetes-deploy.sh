#!/bin/sh
if [ -z "$DOCKER_ACCOUNT" ]; then
    DOCKER_ACCOUNT=parathantl
fi;
kubectl run nginx --image=docker.io/$DOCKER_ACCOUNT/nginx:latest --port=8080
kubectl expose deployment/nginx --type="LoadBalancer" --port 80

kubectl run products --image=docker.io/$DOCKER_ACCOUNT/products:latest --port=8080
kubectl expose deployment/products --type="LoadBalancer" --port 8080

kubectl run review --image=docker.io/$DOCKER_ACCOUNT/review:latest --port=8080
kubectl expose deployment/review --type="LoadBalancer" --port 8080

kubectl run checkout --image=docker.io/$DOCKER_ACCOUNT/checkout:latest --port=8080
kubectl expose deployment/checkout --type="LoadBalancer" --port 8080