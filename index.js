var fs = require('fs');
const net = require('net');
const repl = require('repl');
var connections = 0;

const prompt = '';

var args = require('schema-args')({
  filename: {
    type: String,
    required: true
  }
});

var byline = require('byline');
var lineStream = byline.createStream(null, {
  separator: /|\.\.\./g,
  keepEmptyLines: true
});

var isFirstLine = false;

fs.watchFile(args.filename, (curr, prev) => {
  console.log('file was changed');
  readFileRunRepl(args.filename);
});

var readFileRunRepl = (filename) => {
  io.sockets.emit('clear');
  isFirstLine = true;
  var rs = fs.createReadStream(filename);
  repl.start({
    prompt: prompt,
    input: rs,
    output: lineStream
  });
  rs.on('end', () => {   
    console.log('end readable stream');
  });
};

var app = require('koa')();
var server = require('http').createServer(app.callback());
app.use(require('koa-static')('app'));
var io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('on connect');
  io.emit('line', 'hello');
  readFileRunRepl(args.filename);
});
server.listen(9900);


lineStream.on('data', (line) => {
  if (!isFirstLine) {
    console.log('result line:', line.toString());
    io.sockets.emit('result', line.toString());
  } else {
    isFirstLine = false;
  }
});

readFileRunRepl(args.filename);


