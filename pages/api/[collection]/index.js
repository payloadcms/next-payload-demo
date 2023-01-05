const withPayload = require('../../../middleware/withPayload')
const httpStatus = require('http-status')
const NotFound = require('payload/dist/errors/NotFound').default
const convertPayloadJSONBody = require('../../../middleware/convertPayloadJSONBody')
const authenticate = require('../../../middleware/authenticate')
const initializePassport = require('../../../middleware/initializePassport')
const formatSuccessResponse = require('payload/dist/express/responses/formatSuccess').default
const { getTranslation } = require('payload/dist/utilities/getTranslation')
const i18n = require('../../../middleware/i18n')
const fileUpload = require('../../../middleware/fileUpload')
const withDataLoader = require('../../../middleware/dataLoader')
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default

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

module.exports = withPayload(
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
