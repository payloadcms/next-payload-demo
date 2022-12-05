const withPayload = require('../../middleware/withPayload')
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const fileUpload = require('../../middleware/fileUpload')
const registerFirstUser = require('payload/dist/auth/operations/registerFirstUser').default
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const withCookies = require('../../middleware/cookie') 

async function handler(req, res) {
  try {
    console.log(req.body)

    const firstUser = await registerFirstUser({
      req,
      res,
      collection: req.payload.collections[req.query.collection],
      data: req.body,
    })
  
    return res.status(200).json(firstUser)
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }
}

module.exports = withPayload(
  withDataLoader(
    fileUpload(
      withCookies(
        convertPayloadJSONBody(
          handler
        )
      )
    )
  )
)
