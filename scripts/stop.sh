#!/bin/bash
source $(dirname $_)/shared.sh

cd $CURRENT_PROJECT_DIR

if [[ -f .pidfile ]]; then
  kill -9 $(cat .pidfile) 2> /dev/null
  rm .pidfile > /dev/null
fi

docker-compose down

echo "Everything down, hope you have enjoyed!"
