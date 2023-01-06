import payload from 'payload'

// Need to statically import config to get Next to pick up on it
import config from './payload/payload.config.js'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.payload

if (!cached) {
  cached = global.payload = { payload: null, promise: null }
}

async function getPayload() {
  if (cached.payload) {
    return cached.payload
  }

  if (!cached.promise) {
    cached.promise = payload.initAsync({
      local: true,
      mongoURL: process.env.MONGODB_URI as string,
      secret: process.env.PAYLOAD_SECRET as string,
    }).then(() => payload)
  }

  try {
    cached.payload = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.payload
}

export default getPayload