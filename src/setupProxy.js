// Cheap mocked service leveraging setupProxy
const bodyParser = require('body-parser');
const { endpoint } = require('../server/materials.js');
const { dirname, join } = require('path');

const DATA_FILE = join(dirname(__dirname), 'data/materials.json');

module.exports = app => {
  app.use(bodyParser.json());
  app.use('/materials', endpoint(DATA_FILE));
};