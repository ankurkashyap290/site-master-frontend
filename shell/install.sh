#!/bin/bash

if [ ! -d node_modules ]; then
    yarn install;
fi;

if [ ! -d public ]; then
    chown -R $(ls -lnd . | awk '{print $3}'):www-data ./src/js/config;
    chmod -R g+w ./src/js/config;
    if [ "$TEST" != "true" ]; then
        until [ "$(ls -l ./src/js/config | grep -e ^- | wc -l)" -gt 0 ]
        do
            #Waiting to export configs.
            sleep 1
        done;
    fi;
    yarn run prod && echo "Generated Frontend: Done.";
fi;
