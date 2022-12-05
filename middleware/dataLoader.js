const { getDataLoader } = require('payload/dist/collections/dataloader')

module.exports = (handler) => (req, res) => {
  req.payloadDataLoader = getDataLoader(req);
  handler(req, res)
}