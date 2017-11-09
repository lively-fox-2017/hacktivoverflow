const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
const port = process.env.PORT || 3000;

const apiRoutes = require('./routes');

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/', apiRoutes);

server.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

server.listen(port, () => {
  console.log('Server running on port', port);
});
