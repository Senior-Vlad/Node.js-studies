const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Привіт, 132 Node.js!');
});

server.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});
