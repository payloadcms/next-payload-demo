import authenticate from '../../middleware/authenticate'
import initializePassport from '../../middleware/initializePassport'
import withPayload from '../../middleware/withPayload'
import access from 'payload/dist/auth/operations/access'

async function handler(req, res) {
  const accessResult = await access({
    req,
  })

  return res.status(200).json(accessResult)
}

module.exports = withPayload(
  initializePassport(
    authenticate(
      handler
    )
  )
)
