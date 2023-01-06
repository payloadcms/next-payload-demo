import getPayload from '../getPayload'

const withPayload = (handler) => async (req, res) => {
  req.payload = await getPayload()
  handler(req, res)
}

export default withPayload