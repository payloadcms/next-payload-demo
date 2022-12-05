const withPayload = require('../../middleware/withPayload')
const httpStatus = require('http-status')
const NotFound = require('payload/dist/errors/NotFound').default
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const authenticate = require('../../middleware/authenticate')
const initializePassport = require('../../middleware/initializePassport')
const formatSuccessResponse = require('payload/dist/express/responses/formatSuccess').default
const i18n = require('../../middleware/i18n')
const fileUpload = require('../../middleware/fileUpload')
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const withDataLoader = require('../../middleware/dataloader')
const findPreference = require('payload/dist/preferences/operations/findOne').default
const updatePreference = require('payload/dist/preferences/operations/update').default
const deletePreference = require('payload/dist/preferences/operations/delete').default

async function handler(req, res) {
  try {
    // Unfortunately,
    // There is a route collision between /api/_preferences/[key].js
    // and /api/[collection]/[id].js
    // so both need to be handled in this file for now
    if (req.query.collection === '_preferences') {
      switch (req.method) {
        case 'GET': {
          const result = await findPreference({
            req,
            user: req.user,
            key: req.query.key,
          });
  
          return res.status(httpStatus.OK).json(result || { message: req.t('general:notFound'), value: null })
        }
  
        case 'POST': {
          const doc = await updatePreference({
            req,
            user: req.user,
            key: req.query.key,
            value: req.body.value || req.body,
          });
  
          return res.status(httpStatus.OK).json({
            ...formatSuccessResponse(req.t('general:updatedSuccessfully'), 'message'),
            doc,
          });
        }
  
        case 'DELETE': {
          await deletePreference({
            req,
            user: req.user,
            key: req.params.key,
          });
      
          return res.status(httpStatus.OK).json({
            ...formatSuccessResponse(req.t('deletedSuccessfully'), 'message'),
          });
        }
      }
    }
    
    switch (req.method) {
      case 'GET': {
        console.log({ collection: req.query.collection })
        const doc = await req.payload.findByID({
          req,
          collection: req.query.collection,
          id: req.query.id,
          depth: Number(req.query.depth),
          overrideAccess: false,
          draft: req.query.draft === 'true',
        })

        return res.status(httpStatus.OK).json(doc)
      }

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
