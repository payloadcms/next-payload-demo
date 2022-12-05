const withPayload = require('../../middleware/withPayload')
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const fileUpload = require('../../middleware/fileUpload')
const withDataLoader = require('../../middleware/dataLoader')
const refresh = require('payload/dist/auth/operations/refresh').default
const getExtractJWT = require('payload/dist/auth/getExtractJWT').default
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const withCookie = require('../../middleware/cookie')

async function handler(req, res) {
  try {
    let token;

    const extractJWT = getExtractJWT(req.payload.config);
    token = extractJWT(req);

    if (req.body.token) {
      token = req.body.token;
    }

    const result = await refresh({
      req,
      res,
      collection: req.payload.collections[req.query.collection],
      token,
    });

    return res.status(200).json({
      message: 'Token refresh successful',
      ...result,
    });
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }
}

module.exports = withPayload(
  withDataLoader(
    fileUpload(
      convertPayloadJSONBody(
        withCookie(
          handler
        )
      )
    )
  )
)
