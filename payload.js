const payload = require('payload')
const path = require('path')
const fs = require('fs')

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.payload

if (!cached) {
  cached = global.payload = { payload: null, promise: null }
}

module.exports = async function getPayload() {
  if (cached.payload) {
    return cached.payload
  }

  if (!cached.promise) {
    const file = path.resolve(process.cwd(), './dist/payload.config.js');

    if (fs.existsSync(file)) {
      require(file)
    }

    cached.promise = payload.initAsync({
      local: true,
      mongoURL: process.env.MONGODB_URI,
      secret: process.env.PAYLOAD_SECRET,
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