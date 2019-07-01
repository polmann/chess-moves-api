#!/bin/bash
source $(dirname $_)/shared.sh

if [[ -f .pidfile ]] && ps -p $(cat .pidfile) > /dev/null; then
  echo "Already running, no need to start it again."
  exit
fi

while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -b|--background)
      BACKGROUND=true
      shift
      ;;
    *)
      echo "Unknow param $key"
      exit
      ;;
  esac
shift
done

trap cleanup SIGINT

function cleanup {
  echo -e "\033[1K"
  cd "$CURRENT_PROJECT_DIR"
  ./scripts/stop.sh
  exit
}

cd $CURRENT_PROJECT_DIR

if [[ $BACKGROUND ]]; then
  docker-compose up -d
else
  docker-compose up
fi
