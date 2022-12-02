const withPayload = require('../../middleware/withPayload')
const httpStatus = require('http-status')
const NotFound = require('payload/dist/errors/NotFound').default
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const authenticate = require('../../middleware/authenticate')
const initializePassport = require('../../middleware/initializePassport')
const formatSuccessResponse = require('payload/dist/express/responses/formatSuccess').default
const i18n = require('../../middleware/i18n')
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default

async function handler(req, res) {
  try {

    switch (req.method) {
      case 'PATCH': {
        const draft = req.query.draft === 'true';
        const autosave = req.query.autosave === 'true';
    
        const doc = await req.payload.update({
          req,
          collection: req.query.collection,
          id: req.query.id,
          data: req.body,
          depth: parseInt(String(req.query.depth), 10),
          draft,
          autosave,
          overrideAccess: false,
        });
    
        let message = req.t('general:updatedSuccessfully');
    
        if (draft) message = req.t('versions:draftSavedSuccessfully');
        if (autosave) message = req.t('versions:autosavedSuccessfully');
    
        return res.status(httpStatus.OK).json({
          ...formatSuccessResponse(message, 'message'),
          doc,
        });
      }

      case 'DELETE': {
        const doc = await req.payload.delete({
          req,
          collection: req.query.collection,
          id: req.query.id,
          depth: parseInt(String(req.query.depth), 10),
          overrideAccess: false,
        });
    
        if (!doc) {
          return res.status(httpStatus.NOT_FOUND).json(new NotFound(req.t));
        }
    
        return res.status(httpStatus.OK).send(doc);
      }
    }
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }

  return res.status(httpStatus.NOT_FOUND).json(new NotFound(req.t))
}

module.exports = withPayload(
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
