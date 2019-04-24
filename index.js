const http = require('http');
const Tailor = require('node-tailor');
const tailor = new Tailor({});

// Layout server
const server = http.createServer(tailor.requestHandler);

server.listen(process.env.PORT || 8080, () => {
  console.log('Tailor running on 8080');
});

// Fragment 1
const fragment1 = http.createServer((req, res) => {
  if (req.url === '/script_1.js') {
    res.setHeader('Content-Type', 'application/javascript');
    return res.end('console.log("fragment JS");');
  }

  if (req.url === '/styles_1.css') {
    res.setHeader('Content-Type', 'text/css');
    return res.end('#f1 { background: lightblue; height: 100px; width: 100% }');
  }

  // Every Fragment sends a link header that describes its resources - css and js
  const css = '<http://localhost:8081/styles_1.css>; rel="stylesheet"';
  // this will be fetched using require-js as an amd module
  const js = '<http://localhost:8081/script_1.js>; rel="fragment-script"';

  res.writeHead(200, {
    Link: `${css}, ${js}`,
    'Content-Type': 'text/html'
  });

  // fragment content
  res.end('<div id="f1">Fragment 1</div>');
});

fragment1.listen(8081, () => {
  console.log('Fragment 1 running on 8081');
});

// Fragment 2
const fragment2 = http.createServer((req, res) => {
  if (req.url === '/script_2.js') {
    res.setHeader('Content-Type', 'application/javascript');
    return res.end('console.log("fragment JS");');
  }

  if (req.url === '/styles_2.css') {
    res.setHeader('Content-Type', 'text/css');
    return res.end('#f2 { background: green; height: 100%; }');
  }

  // Every Fragment sends a link header that describes its resources - css and js
  const css = '<http://localhost:8082/styles_2.css>; rel="stylesheet"';
  // this will be fetched using require-js as an amd module
  const js = '<http://localhost:8082/script_2.js>; rel="fragment-script"';

  res.writeHead(200, {
    Link: `${css}, ${js}`,
    'Content-Type': 'text/html'
  });

  // fragment content
  res.end('<div id="f2">Fragment 2</div>');
});

fragment2.listen(8082, () => {
  console.log('Fragment 2 running on 8082');
});

// Fragment 3
const fragment3 = http.createServer((req, res) => {
  if (req.url === '/script_3.js') {
    res.setHeader('Content-Type', 'application/javascript');
    return res.end('console.log("fragment JS");');
  }

  if (req.url === '/styles_3.css') {
    res.setHeader('Content-Type', 'text/css');
    return res.end('#f3 { background: orange; height: 100px; width: 100% }');
  }

  // Every Fragment sends a link header that describes its resources - css and js
  const css = '<http://localhost:8083/styles_3.css>; rel="stylesheet"';
  // this will be fetched using require-js as an amd module
  const js = '<http://localhost:8083/script_3.js>; rel="fragment-script"';

  res.writeHead(200, {
    Link: `${css}, ${js}`,
    'Content-Type': 'text/html'
  });

  // fragment content
  res.end('<div id="f3">Fragment 3</div>');
});

fragment3.listen(8083, () => {
  console.log('Fragment 3 running on 8083');
});
