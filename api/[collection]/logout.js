const withPayload = require('../../middleware/withPayload')
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody');
const initializePassport = require('../../middleware/initializePassport');
const authenticate = require('../../middleware/authenticate');
const logout = require('payload/dist/auth/operations/logout').default
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default

async function handler(req, res) {
  try {
    const message = await logout({
      collection: req.payload.collections[req.query.collection],
      res,
      req,
    });

    return res.status(httpStatus.OK).json({ message });
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }
}

module.exports = withPayload(
  convertPayloadJSONBody(
    initializePassport(
      authenticate(
        handler
      )
    )
  )
)
