const http = require('http')
const makeResponse = require('./response')
const ctrl = require('./controllers')
const { log } = console
const PORT = process.env['PORT'] || 3000
const TIMEOUT = process.env['TIMEOUT'] || 2000
// ////////////////////////////////////////////////////////////////////////// //
const server = http.createServer((req, res) => {
  const { url, method } = req

  timer(req, res)

  try {
    switch (true) {
      case method === 'POST' && /^\/api\/users$/.test(url):
        return ctrl.post(req, res)
      case method === 'GET' && /^\/api\/users$/.test(url):
        return ctrl.get(req, res)
      case method === 'PUT' && /^\/api\/users\/\d+$/.test(url):
        return ctrl.put(req, res)
      case method === 'DELETE' && /^\/api\/users\/\d+$/.test(url):
        return ctrl.del(req, res)
      case method === 'DELETE' && /^\/api\/users$/.test(url):
        return ctrl.flush(req, res)
      default:
        return ctrl.notFound(res)
    }
  } catch ({ message }) {
    makeResponse(res, { ok: false, message })
  }
})

server.timeout = TIMEOUT
server.listen(PORT)
// ////////////////////////////////////////////////////////////////////////// //
function timer(req, res) {
  const startTime = Date.now()
  req.on('end', () =>
    log(
      ` > ${res.statusCode}:${req.method.padEnd(8)}${req.url} (${Date.now() -
        startTime}ms)`
    )
  )
}
// ////////////////////////////////////////////////////////////////////////// //
log(` > Server is listening at http://localhost:${PORT}`)
global.printLine('.')
