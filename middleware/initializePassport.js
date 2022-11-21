const passport = require('passport')

module.exports = (handler) => (req, res) => {
  passport.initialize()(req, res, () =>
    handler(req, res)
  )
}