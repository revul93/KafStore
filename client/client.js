const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const path = require('path');
const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`client server started at port ${PORT}`);
});
