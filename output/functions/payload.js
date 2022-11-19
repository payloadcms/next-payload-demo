import payload from 'payload'

const initializedPayload = null;

if (!initializedPayload) {
  payload.init({
    local: true,
    mongoURL: process.env.MONGODB_URI,
    secret: process.env.PAYLOAD_SECRET,
  });

  initializedPayload = payload_1.default;
}

export default initializedPayload;