const http = require('http');
var dt = require('./datemodule.js'); // Import the date module
var url = require('url'); // Import the url module



const server = http.createServer(/*function (then without => lambd*/(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  
  //res.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8'}),
  res.write('Current time is: ' +dt.myDateTime()+'\n'+req.url+'\n');//req.url - outputs URL of the request example: http://localhost:3000/something_useful -> /something_useful
  res.end('Привіт, 132 Node.js!');

  res.write('\n\n\n');
  var q = url.parse(req.url, true).query; // Parse the URL and get the query string
  var txt = q.year + " " + q.month; // Get the year and month from the query string
  res.write(txt); // Write the year and month to the response
  


});

server.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});
