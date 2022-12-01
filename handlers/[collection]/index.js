const withPayload = require('../../middleware/withPayload')
const authenticate = require('../../middleware/authenticate')
const initializePassport = require('../../middleware/initializePassport')
const formatSuccessResponse = require('payload/dist/express/responses/formatSuccess').default
const { getTranslation } = require('payload/dist/utilities/getTranslation')
const i18n = require('../../middleware/i18n')

async function handler(req, res) {
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
        draft: req.query.draft === 'true'
      })

      return res.status(201).json({
        ...formatSuccessResponse(req.i18n.t('general:successfullyCreated', { label: getTranslation(req.collection.config.labels.singular, req.i18n) }), 'message'),
        doc,
      })
    }
  }


  return res.status(200).json({ body: req.body, query: req.query })
}

module.exports = withPayload(
  i18n(
    initializePassport(
      authenticate(
        handler
      )
    )
  )
)
