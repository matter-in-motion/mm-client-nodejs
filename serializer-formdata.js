'use strict';
const fs = require('fs');
const FormData = require('form-data');

module.exports = {
  mime: 'multipart/form-data',

  encode: (data, files = []) => {
    const form = new FormData();
    for (const key in data) {
      form.append(key, data[key]);
    }

    files.forEach((file, i) => {
      form.append(i, typeof file === 'string' ?
        fs.createReadStream(file) :
        file);
    })
    return form;
  },

  decode: () => {
    throw Error('Not ready yet');
  }
};
