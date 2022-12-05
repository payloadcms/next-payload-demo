const withPayload = require('../middleware/withPayload')
const httpStatus = require('http-status')
const NotFound = require('payload/dist/errors/NotFound').default
const authenticate = require('../middleware/authenticate')
const initializePassport = require('../middleware/initializePassport')
const i18n = require('../middleware/i18n')
const getErrorHandler = require('payload/dist/express/middleware/errorHandler').default
const withDataLoader = require('../middleware/dataLoader')
const graphQLHandler = require('payload/dist/graphql/graphQLHandler').default

async function handler(req, res) {
  try {
    req.payloadAPI = 'GraphQL'

    if (req.method === 'POST') {
      return graphQLHandler(req, res)(req, res)
    }

    if (req.method === 'OPTIONS') {
      res.status(httpStatus.OK)
    }
  } catch (error) {
    const errorHandler = getErrorHandler(req.payload.config, req.payload.logger)
    return errorHandler(error, req, res);
  }

  return res.status(httpStatus.NOT_FOUND).json(new NotFound(req.t))
}

module.exports = withPayload(
  withDataLoader(
    i18n(
      initializePassport(
        authenticate(
          handler
        )
      )
    )
  )
)