# Matter In Motion. Node.js client

[![NPM Version](https://img.shields.io/npm/v/mm-client-nodejs.svg?style=flat-square)](https://www.npmjs.com/package/mm-client-nodejs)
[![NPM Downloads](https://img.shields.io/npm/dt/mm-client-nodejs.svg?style=flat-square)](https://www.npmjs.com/package/mm-client-nodejs)

Node.js client for [matter in motion](https://github.com/matter-in-motion/mm) framework

## Installation

`npm i mm-client`

## Usage

```js
const client = require('mm-client');

const mm = client({
  host: 'localhost:3000'
});

mm('?').then(res => console.log(res));
```

### client(opts)

Creates a client function. Options:

* **host** – string, API host. IP or domain.
* tls — boolean, default `false`. Use TLS (https) connection or not.
* api — string, default `/api`. API path
* serializer — serializer to use. By default client uses JSON serializer except for sending files it uses FormData.
* meat – request metadata, will be used in every request with empty meta

### mm(call, data, opts)

Makes a call. Returns a Promise.

* **call** — string, resource call
* data — object, data to send
* opts
  - header — object, headers to add to the request
  - meta — metadata to send with the request
  - files — the array of paths or streams to send
  - agent — as in [https://github.com/sindresorhus/got#proxies](https://github.com/sindresorhus/got#proxies)

License: MIT

