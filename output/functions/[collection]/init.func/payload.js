import payload from 'payload'

const initializedPayload = null;

export default function getPayload() {
  if (!initializedPayload) {
    payload.init({
      local: true,
      mongoURL: process.env.MONGODB_URI,
      secret: process.env.PAYLOAD_SECRET,
    });
  
    initializedPayload = payload_1.default;
  }

  return initializedPayload
};