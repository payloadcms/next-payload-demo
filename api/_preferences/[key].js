const withPayload = require('../../middleware/withPayload')
const httpStatus = require('http-status')
const convertPayloadJSONBody = require('../../middleware/convertPayloadJSONBody')
const authenticate = require('../../middleware/authenticate')
const initializePassport = require('../../middleware/initializePassport')
const formatSuccessResponse = require('payload/dist/express/responses/formatSuccess').default
const i18n = require('../../middleware/i18n')
const fileUpload = require('../../middleware/fileUpload')
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const findOne = require('payload/dist/preferences/operations/findOne').default
const update = require('payload/dist/preferences/operations/update').default
const deleteOperation = require('payload/dist/preferences/operations/delete').default

async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        const result = await findOne({
          req,
          user: req.user,
          key: req.query.key,
        });

        return res.status(httpStatus.OK).json(result || { message: req.t('general:notFound'), value: null })
      }

      case 'POST': {
        const doc = await update({
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
        await deleteOperation({
          req,
          user: req.user,
          key: req.params.key,
        });
    
        return res.status(httpStatus.OK).json({
          ...formatSuccessResponse(req.t('deletedSuccessfully'), 'message'),
        });
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
