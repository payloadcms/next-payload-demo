const authenticate = require('payload/dist/express/middleware/authenticate').default

module.exports = (handler) => (req, res) => {
  authenticate(req.payload.config)(req, res, () =>
    handler(req, res)
  )
}