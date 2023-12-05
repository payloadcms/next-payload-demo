import '../../css/app.scss'

const handler = (req, res) => {
  return res.json({ message: "hello" })
}

export default handler