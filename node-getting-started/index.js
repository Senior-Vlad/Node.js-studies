const http = require('http');
var dt = require('./datemodule.js'); // Import the date module

const server = http.createServer(/*function (then without => lambd*/(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  //res.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8'}),
  res.write('Current time is: ' +dt.myDateTime()+'\n');
  res.end('Привіт, 132 Node.js!');
});

server.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});
