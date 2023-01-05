import withPayload from '../../../middleware/withPayload'
import convertPayloadJSONBody from '../../../middleware/convertPayloadJSONBody'
import fileUpload from '../../../middleware/fileUpload'
import registerFirstUser from 'payload/dist/auth/operations/registerFirstUser'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'
import withCookies from '../../../middleware/cookie'
import withDataLoader from '../../../middleware/dataLoader'

async function handler(req, res) {
  try {
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

export const config = {
  api: {
    bodyParser: false,
  }
}

export default withPayload(
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
