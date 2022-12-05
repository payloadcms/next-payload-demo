const withPayload = require('../../middleware/withPayload')
const httpStatus = require('http-status')
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const login = require('payload/dist/auth/operations/login').default
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const withCookie = require('../../middleware/cookie')
const fileUpload = require('../../middleware/fileUpload')
const withDataLoader = require('../../middleware/dataloader')

async function handler(req, res) {
  try {
    const result = await login({
      req,
      res,
      collection: req.payload.collections[req.query.collection],
      data: req.body,
      depth: parseInt(String(req.query.depth), 10),
    })
  
    return res.status(httpStatus.OK)
      .json({
        message: 'Auth Passed',
        user: result.user,
        token: result.token,
        exp: result.exp,
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
