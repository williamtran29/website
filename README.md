# smooth-code-website

[![Build Status](https://travis-ci.org/smooth-code/website.svg?branch=master)](https://travis-ci.org/smooth-code/website)
[![codecov](https://codecov.io/gh/smooth-code/website/branch/master/graph/badge.svg)](https://codecov.io/gh/smooth-code/website)

## Install

```
docker-compose up -d
yarn
yarn db:load
yarn db:seed
```

Create a .env with:

```sh
TZ=utc
```

## Run

```
yarn dev:server
yarn dev:client
```
