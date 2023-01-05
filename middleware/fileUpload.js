const fileUpload = require('express-fileupload')
const express = require('express')

module.exports = (handler) => (req, res) => {
  express.json(req.payload.config.express.json)(req, res, () =>
    fileUpload({
      parseNested: true,
      ...req.payload.config.upload,
    })(req, res, () =>
      handler(req, res)
    )
  )
}
