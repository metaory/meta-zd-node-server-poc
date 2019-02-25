const db = require('./db')
// ////////////////////////////////////////////////////////////////////////// //
exports.list = () => ({ ok: true, list: db.read() })
// ////////////////////////////////////////////////////////////////////////// //
exports.update = user => {
  const data = db.read()
  const userIndex = data.findIndex(({ id }) => id === user.id)

  if (userIndex < 0) return { ok: false, message: 'USER-NOT-FOUND' }

  data[userIndex] = user
  db.write(data)
  return { ok: true, user }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.create = obj => {
  const data = db.read()
  const user = { id: Date.now(), ...obj }

  data.push(user)
  db.write(data)
  return { ok: true, user }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.remove = userId => {
  const data = db.read()
  const userIndex = data.findIndex(({ id }) => id === Number(userId))

  if (userIndex < 0) return { ok: false, message: 'USER-NOT-FOUND' }

  data.splice(userIndex, 1)
  db.write(data)
  return { ok: true, userId }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.flush = () => {
  db.write([])
  return { ok: true }
}
