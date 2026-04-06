const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(publicDir, reqPath);

  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === '.html' ? 'text/html; charset=utf-8' :
    ext === '.js'   ? 'text/javascript; charset=utf-8' :
    ext === '.css'  ? 'text/css; charset=utf-8' :
    'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      const status = err.code === 'ENOENT' ? 404 : 500;
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(status === 404 ? '404 Not Found' : '500 Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
