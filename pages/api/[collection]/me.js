import meOperation from 'payload/dist/auth/operations/me'
import withPayload from '../../../middleware/withPayload'
import authenticate from '../../../middleware/authenticate'
import initializePassport from '../../../middleware/initializePassport'
import withDataLoader from '../../../middleware/dataLoader'

async function handler(req, res) {
  const collection = req.payload.collections[req.query.collection]
  const result = await meOperation({ req, collection })
  return res.status(200).json(result)
}

module.exports = withPayload(
  withDataLoader(
    initializePassport(
      authenticate(
        handler
      )
    )
  )
)
