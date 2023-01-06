import withPayload from '../../../middleware/withPayload'
import httpStatus from 'http-status'
import convertPayloadJSONBody from '../../../middleware/convertPayloadJSONBody'
import login from 'payload/dist/auth/operations/login'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'
import withCookie from '../../../middleware/cookie'
import fileUpload from '../../../middleware/fileUpload'
import withDataLoader from '../../../middleware/dataLoader'

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
    return errorHandler(error, req, res, () => null);
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
      convertPayloadJSONBody(
        withCookie(
          handler
        )
      )
    )
  )
)
