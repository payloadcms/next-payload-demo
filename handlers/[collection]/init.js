const initOperation = require('payload/dist/auth/operations/init').default
const getPayload = require('../../payload')

module.exports = async function handler(req, res) {
  const payload = getPayload()
  const Model = payload.collections[req.query.collection].Model
  const initialized = await initOperation({ req, Model })
  return res.status(200).json({ initialized: true })
}