# Grocery-fe

## Description

This is the frontend of [grocery-be](https://github.com/nico-iaco/grocery-be) and [food-track-be](https://github.com/nico-iaco/food-track-be). This application can track your meals and your pantry preventing food waste.

This app is made with [Reactjs](https://reactjs.org) with redux for state management and [material-ui](https://mui.com) components.

## Requirements

 - [grocery-be](https://github.com/nico-iaco/grocery-be)
 - [food-track-be](https://github.com/nico-iaco/food-track-be)

 ## Installation

 ### Cluster installation

To install the application in a cluster you have to create grocery
namespace, modify the kustomization.yaml file to match your configuration and run the following command:

```bash
kubectl apply -k k8s/overlays/qa
```

### Local installation

To run the application locally with docker. To do so run the following command:

```bash
docker run -p 8080:8080 ghcr.io/nico-iaco/grocery-fe:latest 
```
