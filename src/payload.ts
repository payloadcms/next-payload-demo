import payload from 'payload'

require('dotenv').config()

let initializedPayload = null;

if (!initializedPayload) {
  payload.init({
    local: true, // disable all built-in HTTP stuff
    mongoURL: process.env.MONGODB_URI,
    secret: process.env.PAYLOAD_SECRET,
  })

  initializedPayload = payload
}

export default initializedPayload