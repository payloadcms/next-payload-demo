const graphQLPlayground = require('graphql-playground-middleware-express').default
const withPayload = require('../middleware/withPayload')

async function handler(req, res) {
  return graphQLPlayground({
    endpoint: `${req.payload.config.routes.api}${req.payload.config.routes.graphQL}`,
    settings: {
      'request.credentials': 'include'
    }
  })(req, res)
}

module.exports = withPayload(
  handler
)