import withPayload from '../../middleware/withPayload'
import httpStatus from 'http-status'
import NotFound from 'payload/dist/errors/NotFound'
import authenticate from '../../middleware/authenticate'
import initializePassport from '../../middleware/initializePassport'
import i18n from '../../middleware/i18n'
import getErrorHandler from 'payload/dist/express/middleware/errorHandler'
import withDataLoader from '../../middleware/dataLoader'
import graphQLHandler from 'payload/dist/graphql/graphQLHandler'

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

export defualt withPayload(
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