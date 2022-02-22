# node-compose-app-template

This is a project template that uses a node web app, mongodb, redis, and nginx.
The services are managed by docker-compose

# Dev Run
```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

# Prod Run
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

# Tear down
```
$ docker-compose -f docker-compose.yml -f docker-compose.${dev | prod}.yml down
```
# Notes
1. If you need to rebuild an image add a **--build** to the end of the up comands
2. If you want to remove the volumes add **-v** to the tear down command
3. If you want to scale node-app add **--scale node-app=2** to end of up command




