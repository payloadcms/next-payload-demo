import withPayload from '../../../middleware/withPayload'
import convertPayloadJSONBody from '../../../middleware/convertPayloadJSONBody'
import fileUpload from '../../../middleware/fileUpload'
import withDataLoader from '../../../middleware/dataLoader'
import refresh from 'payload/dist/auth/operations/refresh'
import getExtractJWT from 'payload/dist/auth/getExtractJWT'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'
import withCookie from '../../../middleware/cookie'

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
