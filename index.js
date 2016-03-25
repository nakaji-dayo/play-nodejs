module.exports = (filename) => {
  var fs = require('fs');
  const net = require('net');
  const repl = require('repl');
  var connections = 0;

  const prompt = '';


  var byline = require('byline');
  var lineStream = byline.createStream(null, {
    separator: /|\.\.\./g,
    keepEmptyLines: true
  });

  var isFirstLine = false;

  require('touch').sync(filename);
  
  fs.watchFile(filename, (curr, prev) => {
    readFileRunRepl(filename);
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
    });
  };

  var app = require('koa')();
  var server = require('http').createServer(app.callback());
  app.use(require('koa-static')('app'));
  var io = require('socket.io')(server);
  io.on('connection', (socket) => {
    io.emit('line', 'hello');
    readFileRunRepl(filename);
  });
  server.listen(9900);


  lineStream.on('data', (line) => {
    if (!isFirstLine) {
      io.sockets.emit('result', line.toString());
    } else {
      isFirstLine = false;
    }
  });

  readFileRunRepl(filename);
};
