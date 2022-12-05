const authenticate = require('payload/dist/express/middleware/authenticate').default

module.exports = (handler) => (req, res) => {
  // Need to backfill req.get -
  // it's relied on within payload auth to retrieve auth headers
  req.get = (headerName) => req.headers[headerName.toLowerCase()]

  authenticate(req.payload.config)(req, res, () =>
    handler(req, res)
  )
}