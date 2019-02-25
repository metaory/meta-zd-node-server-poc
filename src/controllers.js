/* eslint-disable */
const makeResponse = require('./response')
const validate = require('./validate')
const model = require('./model')

// ////////////////////////////////////////////////////////////////////////// //
const resolveRequest = req =>
  new Promise(resolve => {
    let body = ''
    req.on('data', data => (body += data))
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (e) {
        resolve({})
      }
    })
  })
// ////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////// //
exports.post = async (req, res) => {
  const payload = await resolveRequest(req)

  if (validate(payload) === false)
    return makeResponse(res, {
      ok: false,
      message: 'validation failed'
    })

  makeResponse(res, model.create(payload))
}
// ////////////////////////////////////////////////////////////////////////// //
exports.get = (req, res) => makeResponse(res, model.list())
// ////////////////////////////////////////////////////////////////////////// //
exports.put = async (req, res) => {
  const [id] = req.url.split('/').reverse()
  const payload = await resolveRequest(req)

  if (validate(payload) === false)
    return makeResponse(res, {
      ok: false,
      message: 'validation failed'
    })

  makeResponse(res, model.update(payload))
}
// ////////////////////////////////////////////////////////////////////////// //
exports.del = ({ url }, res) => {
  const [userId] = url.split('/').reverse()
  makeResponse(res, model.remove(userId))
}
// ////////////////////////////////////////////////////////////////////////// //
exports.flush = (req, res) => {
  makeResponse(res, model.flush())
}
// ////////////////////////////////////////////////////////////////////////// //
exports.notFound = res => res.writeHead(404).end()
