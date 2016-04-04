#!/usr/bin/env node

try {
var args = require('schema-args')({
  filename: {
    type: String,
    required: true,
    description: 'filename',
    index: 0
  }
}, {
  binName: 'play-nodejs'
});
} catch(_) {
  process.exit(1);
}

require('../index.js')(args.filename);

require('open')('http://localhost:9900');
