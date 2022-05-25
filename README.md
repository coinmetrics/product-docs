# Knowledge Base

Coin Metrics Knowledge Base application https://docs.coinmetrics.io/info


## Usage

- `export BUILD_ID="$( git rev-parse --short HEAD )"` will set the Build ID environment variable which populates in the logs
- `yarn serve` will give you a running instance on http://localhost:3000/
- `yarn watch` will give you a dev server, which will reload on any file changes, on http://localhost:3000/
- Docker
  - Build `docker build -t kb --build-arg BUILD_ID=$BUILD_ID .`
  - Run `docker run --rm -p 3000:3000 --name kb kb`
  - Stop `docker container stop kb`