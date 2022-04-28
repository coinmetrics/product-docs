#!/bin/bash

cp ./nginx.kendall-dev.conf /opt/homebrew/etc/nginx/nginx.conf
nginx -s reload