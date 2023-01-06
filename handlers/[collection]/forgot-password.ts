import withPayload from '../../../middleware/withPayload'
import httpStatus from 'http-status'
import convertPayloadJSONBody from '../../../middleware/convertPayloadJSONBody'
import fileUpload from '../../../middleware/fileUpload'
import forgotPassword from 'payload/dist/auth/operations/forgotPassword'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'

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

export const config = {
  api: {
    bodyParser: false,
  }
}

export default withPayload(
  fileUpload(
    convertPayloadJSONBody(
      handler
    )
  )
)
