#!/bin/bash 

cd src/

npx tsc init-mongo.ts

sleep 1

node init-mongo.js 