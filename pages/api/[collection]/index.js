import withPayload from '../../../middleware/withPayload'
import httpStatus from 'http-status'
import NotFound from 'payload/dist/errors/NotFound'
import convertPayloadJSONBody from '../../../middleware/convertPayloadJSONBody'
import authenticate from '../../../middleware/authenticate'
import initializePassport from '../../../middleware/initializePassport'
import formatSuccessResponse from 'payload/dist/express/responses/formatSuccess'
import { getTranslation } from 'payload/dist/utilities/getTranslation'
import i18n from '../../../middleware/i18n'
import fileUpload from '../../../middleware/fileUpload'
import withDataLoader from '../../../middleware/dataLoader'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'

async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        let page;
  
        if (typeof req.query.page === 'string') {
          const parsedPage = parseInt(req.query.page, 10);
    
          if (!Number.isNaN(parsedPage)) {
            page = parsedPage;
          }
        }
  
        const result = await req.payload.find({
          req,
          collection: req.query.collection,
          where: req.query.where,
          page,
          limit: Number(req.query.limit),
          sort: req.query.sort,
          depth: Number(req.query.depth),
          draft: req.query.draft === 'true',
          overrideAccess: false,
        })
  
        return res.status(200).json(result)
      }
  
      case 'POST': {
        const doc = await req.payload.create({
          req,
          collection: req.query.collection,
          data: req.body,
          depth: Number(req.query.depth),
          draft: req.query.draft === 'true',
          overrideAccess: false,
          file: req.files && req.files.file ? req.files.file : undefined,
        })

        const collection = req.payload.collections[req.query.collection]
  
        return res.status(201).json({
          ...formatSuccessResponse(req.i18n.t('general:successfullyCreated', { label: getTranslation(collection.config.labels.singular, req.i18n) }), 'message'),
          doc,
        })
      }
    }
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }

  return res.status(httpStatus.NOT_FOUND).json(new NotFound(req.t))
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
        i18n(
          initializePassport(
            authenticate(
              handler
            )
          )
        )
      )
    )
  )
)
