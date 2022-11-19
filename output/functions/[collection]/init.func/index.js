import initOperation from 'payload/dist/auth/operations/init'
import getPayload from './payload'

export default async function handler(req, res) {
  const payload = getPayload()
  const Model = payload.collections[req.query.collection].Model
  const initialized = await initOperation({ req, Model })
  return res.status(200).json({ initialized })
}