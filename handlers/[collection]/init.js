import initOperation from 'payload/dist/auth/operations/init'
import withPayload from '../../../middleware/withPayload'

async function handler(req, res) {
  const Model = req.payload.collections[req.query.collection].Model
  const initialized = await initOperation({ req, Model })
  return res.status(200).json({ initialized })
}

module.exports = withPayload(handler)