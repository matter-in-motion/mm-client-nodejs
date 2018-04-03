'use strict';

module.exports = {
  mime: 'application/json',
  encode: data => (typeof data === 'object' ? JSON.stringify(data) : data),
  decode: data => JSON.parse(data)
};
