# Frontend Performance Measure Sample

```sh
$ yarn install
$ yarn run build
```

## Sample

```
$ mkdir output
$ yarn run cli:sample
```

Output: ./output/sample.json

## Analysis

```
$ cd sample
$ pip3 install -r requirements.txt
$ jupyter lab
```

## Sample Login Code Build

```sh
$ tsc ./sample/login.ts --lib es2018,dom --module commonjs
```

```sh
$ node ./lib/cli.js --prepareScript ./sample/sample.js --interval 1 --end 10 --output ./output/sample.json
```

Sample code use [direnv](https://github.com/direnv/direnv).
Environ Setting is below.

```.env
export USERNAME=
export PASSWORD=
export LOGIN_URL=
export FINISH_URL=
export USERNAME_ID=
export PASSWORD_ID=
export SUBMIT_ID=
```

Debugging


```sh
$ tsc ./sample/*.ts --lib es2018,dom --module commonjs
$ node ./lib/cli.js \
--prepareScript ./sample/login.js \
--loopScript ./sample/loop.js \
--endScript ./sample/end.js \
--interval 1 --end 10 --output ./output/sample.json
```