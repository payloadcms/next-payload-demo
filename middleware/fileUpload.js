const fileUpload = require('express-fileupload')

module.exports = (handler) => (req, res) => {
  fileUpload({
    parseNested: true,
    ...req.payload.config.upload,
  })(req, res, () =>
    handler(req, res)
  )
}
