const withPayload = require('../../middleware/withPayload')
const httpStatus = require('http-status')
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const fileUpload = require('../../middleware/fileUpload')
const forgotPassword = require('payload/dist/auth/operations/forgotPassword').default
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default

async function handler(req, res) {
  try {
    const collection = req.payload.collections[req.query.collection]

    await forgotPassword({
      req,
      collection,
      data: { email: req.body.email },
      disableEmail: req.body.disableEmail,
      expiration: req.body.expiration,
    });

    return res.status(httpStatus.OK)
      .json({
        message: 'Success',
      });
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }
}

module.exports = withPayload(
  fileUpload(
    convertPayloadJSONBody(
      handler
    )
  )
)
