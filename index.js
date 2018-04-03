'use strict';
const errors = require('mm-errors');
const got = require('got');

const serializerJSON = require('./serializer-json');
const serializerFormData = require('./serializer-formdata');

module.exports = settings => {
  const host = (settings.tls ? 'https://' : 'http://') + settings.host;
  const api = host + (settings.api || '/api');
  const serializer = settings.serializer || serializerJSON;
  const defaultMeta = settings.meta;

  return (call, data, opts = {}) => {
    const request = {
      method: 'POST',
      headers: Object.assign({
        'MM': `{"call":"${call}"}`,
        'Accept': serializer.mime
      }, opts.headers)
    }

    const meta = opts.meta || defaultMeta;
    if (meta) {
      request.headers.Authorization = `Bearer ${meta}`;
    }

    try {
      if (opts.files) {
        request.body = serializerFormData.encode(data, opts.files);
        request.headers['Content-Type'] = request.body.getHeaders()['content-type'];
      } else {
        request.body = serializer.encode(data);
        request.headers['Content-Type'] = serializer.mime;
      }
    } catch (e) {
      return Promise.reject(errors.RequestEncode(e));
    }

    if (opts.agent) {
      request.agent = opts.agent;
    }

    return got(api, request)
      .then(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            return serializer.decode(res.body);
          } catch (e) {
            return [ errors.ResponseDecode(e) ];
          }
        }

        return [ errors.ServerError(res) ];
      })
      .then(msg => {
        if (typeof msg[0] === 'object') {
          throw msg[0];
        }

        return msg[1];
      })
  }
};
