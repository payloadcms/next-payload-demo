import { SanitizedConfig } from 'payload/config'
import { getPayload as getPayloadLocal } from 'payload/dist/payload'

let config: SanitizedConfig

if (process.env.NODE_ENV === 'production') {
  // Need to statically import config to get Next to pick up on it
  config = require('./dist/payload.config')
} else {
  config = require('./payload/payload.config')
}

const getPayload = async () => {
  return getPayloadLocal({
    mongoURL: process.env.MONGODB_URI as string,
    secret: process.env.PAYLOAD_SECRET as string,
    config,
  })
}


export default getPayload