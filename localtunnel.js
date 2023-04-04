const localtunnel = require('localtunnel');

const server = require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello, world!');
  res.end();
});

const tunnel = localtunnel({ port: 3000 }, (err, tunnel) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Tunnel URL: ${tunnel.url}`);
  }
});

tunnel.on('close', () => {
  console.log('Tunnel closed');
});

process.on('SIGINT', () => {
  tunnel.close();
  server.close();
  process.exit();
});