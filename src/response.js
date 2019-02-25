module.exports = (res, obj = {}) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ ...obj }))
  res.end()
}
