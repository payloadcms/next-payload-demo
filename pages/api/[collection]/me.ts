import meOperation from 'payload/dist/auth/operations/me'
import withPayload from '../../../middleware/withPayload'
import authenticate from '../../../middleware/authenticate'
import initializePassport from '../../../middleware/initializePassport'
import withDataLoader from '../../../middleware/dataLoader'
import { timestamp } from '../../../utilities/timestamp'

async function handler(req, res) {
  const collection = req.payload.collections[req.query.collection]
  timestamp('before me')
  const result = await meOperation({ req, collection })
  timestamp('after me')
  return res.status(200).json(result)
}

export default withPayload(
  withDataLoader(
    initializePassport(
      authenticate(
        handler
      )
    )
  )
)
