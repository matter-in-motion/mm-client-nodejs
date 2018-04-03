'use strict';
const test = require('ava');
const { createApp, getToken } = require('mm-test');
const client = require('./index');

process.env.NODE_ENV = '';

const app = createApp({}, {
  auth: 'test',
  test: true
});
const mm = client({ host: 'localhost:3000' });

test('checks the app', t => t.true(app.inited))

test('calls the discovery request', t => mm('?')
  .then(res => {
    t.is(res[0], 'test');
  })
)

test('calls the discovery request', t => mm('test?')
  .then(res => {
    t.is(res[0], 'echo');
    t.is(res[1], 'error');
  })
)

test('calls the discovery request', t => mm('test.echo?')
  .then(res => {
    t.is(typeof res, 'object');
    t.truthy(res.request);
    t.truthy(res.response);
    t.truthy(res.title);
    t.truthy(res.description);
  })
)

test('checks the error response', t => mm('test.error', { mm: 'NotFound' })
  .catch(err => {
    t.is(err.code, 4540);
  })
)

test('calls the authorized request', t => getToken(app, { provider: 'test' })
  .then(token => mm('test.echo', { hello: 'world' }, { meta: token.token }))
  .then(res => t.is(res.hello, 'world'))
)
