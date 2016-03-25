#!/usr/bin/env node

try {
var args = require('schema-args')({
  filename: {
    type: String,
    required: true
  }
});
} catch(_) {
  process.exit(1);
}

require('../index.js')(args.filename);

require('open')('http://localhost:9900');
