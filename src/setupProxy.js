// Cheap mocked service leveraging setupProxy
const bodyParser = require('body-parser');
const materials = require('../server/materials.js');

module.exports = app => {
  app.use(bodyParser.json());
  app.use('/materials', materials);
};