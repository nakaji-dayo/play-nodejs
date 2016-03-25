#!/usr/bin/env node

var args = require('schema-args')({
  filename: {
    type: String,
    required: true
  }
});

require('../index.js')(args.filename);

require('open')('http://localhost:9900');
