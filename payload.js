const payload = require('payload')

const initializedPayload = null;

module.exports = function getPayload() {
  console.log({ cwd: process.cwd() })
  console.log({ config: process.env.PAYLOAD_CONFIG_PATH })
  if (!initializedPayload) {
    payload.init({
      local: true,
      mongoURL: process.env.MONGODB_URI,
      secret: process.env.PAYLOAD_SECRET,
    });
  
    initializedPayload = payload;
  }

  return initializedPayload
};