import withPayload from '../../../middleware/withPayload'
import convertPayloadJSONBody from '../../../middleware/convertPayloadJSONBody'
import initializePassport from '../../../middleware/initializePassport'
import authenticate from '../../../middleware/authenticate'
import logout from 'payload/dist/auth/operations/logout'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'
import withCookie from '../../../middleware/cookie'

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

export default withPayload(
  convertPayloadJSONBody(
    initializePassport(
      authenticate(
        withCookie(
          handler
        )
      )
    )
  )
)
