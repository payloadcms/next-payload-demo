import meOperation from 'payload/dist/auth/operations/me'
import withPayload from '@payloadcms/next-payload/middleware/withPayload'
import withDataLoader from '@payloadcms/next-payload/middleware/dataLoader'

async function handler(req, res) {
  return res.status(200).json({ message: 'hi' })
}

export default withPayload(
  withDataLoader(
    handler
  )
)
