const getPayload = require('../payload')

module.exports = (handler) => (req, res) => {
  req.payload = getPayload()
  handler(req, res)
}