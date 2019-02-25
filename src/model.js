const db = require('./db')
// ////////////////////////////////////////////////////////////////////////// //
exports.list = () => ({ ok: true, message: 'USER-LIST', list: db.read() })
// ////////////////////////////////////////////////////////////////////////// //
exports.update = (userId, user) => {
  const data = db.read()
  const userIndex = data.findIndex(({ id }) => id == userId)

  if (userIndex < 0) return { ok: false, message: 'USER-NOT-FOUND' }

  data[userIndex] = { id: userId, ...user }
  db.write(data)
  return { ok: true, message: 'USER-updated', userId, user }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.create = obj => {
  const data = db.read()
  const user = { id: Date.now(), ...obj }

  data.push(user)
  db.write(data)
  return { ok: true, message: 'USER-CREATED', user }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.remove = userId => {
  const data = db.read()
  const userIndex = data.findIndex(({ id }) => id == userId)

  if (userIndex < 0) return { ok: false, message: 'USER-NOT-FOUND', userId }

  data.splice(userIndex, 1)
  db.write(data)
  return { ok: true, message: 'USER-REMOVED', userId }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.flush = () => {
  db.write([])
  return { ok: true, message: 'DB-FLUSHED' }
}
