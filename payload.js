const payload = require('payload')
const path = require('path')
const fs = require('fs')

let initializedPayload = null;

module.exports = function getPayload() {
  if (!initializedPayload) {
    const file = path.resolve(process.cwd(), './dist/payload.config.js');
    // Need to read config file to force Vercel to include it in output
    fs.readFileSync(file, 'utf8');
    
    payload.init({
      local: true,
      mongoURL: process.env.MONGODB_URI,
      secret: process.env.PAYLOAD_SECRET,
    });
  
    initializedPayload = payload;
  }

  return initializedPayload
};