#!/usr/bin/env bash

set -ex


docker run -d --name nocodb -p 18080:8080 nocodb/nocodb
