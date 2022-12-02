const withPayload = require('../../middleware/withPayload')
const access = require('payload/dist/auth/operations/access').default

async function handler(req, res) {
  const accessResult = await access({
    req,
  })

  return res.status(200).json(accessResult)
}

module.exports = withPayload(
  handler
)
