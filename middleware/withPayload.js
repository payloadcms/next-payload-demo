import getPayload from '../payload'

module.exports = (handler) => async (req, res) => {
  req.payload = await getPayload()
  handler(req, res)
}