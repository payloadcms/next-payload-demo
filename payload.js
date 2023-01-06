const payload = require('payload')
const path = require('path')
const fs = require('fs')

let initializedPayload = null;

module.exports = function getPayload() {
  if (!initializedPayload) {
    const distFolder = path.resolve(process.cwd(), './dist');
    // Need to read config file to force Vercel to include it in output
    fs.readdirSync(distFolder);
    
    payload.init({
      local: true,
      mongoURL: process.env.MONGODB_URI,
      secret: process.env.PAYLOAD_SECRET,
    });
  
    initializedPayload = payload;
  }

  return initializedPayload
};