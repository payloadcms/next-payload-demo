const { i18nMiddleware } = require('payload/dist/express/middleware/i18n')

module.exports = (handler) => (req, res) => {
  i18nMiddleware(req.payload.config.i18n)(req, res, () =>
    handler(req, res)
  )
}