const path = require('path')
const fs = require('fs')
const initOperation = require('payload/dist/auth/operations/init').default
const getPayload = require('../../payload')

module.exports = async function handler(req, res) {
  const file = path.resolve(process.cwd(), './dist/payload.config.js');
  const stringified = readFileSync(file, 'utf8');

  const payload = getPayload()
  const Model = payload.collections[req.query.collection].Model
  const initialized = await initOperation({ req, Model })
  return res.status(200).json({ initialized, stringified })
}