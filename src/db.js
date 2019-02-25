const fs = require('fs')
const path = require('path')
const opts = { encoding: 'utf8' }
const DB_PATH = process.env['DB_PATH'] || path.resolve(process.cwd(), 'db.json')
// ////////////////////////////////////////////////////////////////////////// //
exports.read = () => {
  try { return JSON.parse(fs.readFileSync(DB_PATH, opts))
  } catch (e) { return [] }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.write = data =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), opts)
// ////////////////////////////////////////////////////////////////////////// //
try { fs.statSync(DB_PATH)
} catch (e) { exports.write([]) }
// ////////////////////////////////////////////////////////////////////////// //
