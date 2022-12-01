const withPayload = require('../../middleware/withPayload')
const registerFirstUser = require('payload/dist/auth/operations/registerFirstUser').default

async function handler(req, res) {
  const firstUser = await registerFirstUser({
    req,
    res,
    collection: req.payload.collections[req.query.collection],
    data: req.body,
  })

  return res.status(200).json(firstUser)
}

module.exports = withPayload(
  handler
)
