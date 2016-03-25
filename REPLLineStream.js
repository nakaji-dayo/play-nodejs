var Transform = require('stream').Transform;
var inherits = require('util').inherits;

module.exports = REPLLineStream;

function REPLLineStream(options) {
  if (! options) options = {};
  options.objectMode = true;
  Transform.call(this, options);
}

inherits(REPLLineStream, Transform);

REPLLineStream.prototype._transform = function _transform(data, encoding, callback) {
  console.log(data, encoding, callback);
  this.push(data);
  callback();
};
