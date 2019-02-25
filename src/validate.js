const ALPHA_SPACE = /^[A-z\s]+$/
const EMAIL = /^\w+@\w+.\w+$/
const PHONE = /^\+\d+$/
const NUMBER = /^\d+$/
const ALPHA_NUM = /^[\w\s]+$/
// ////////////////////////////////////////////////////////////////////////// //
const schema = {
  name: ALPHA_SPACE,
  gender: ALPHA_SPACE,
  email: EMAIL,
  phone: PHONE,
  address: [
    {
      number: NUMBER,
      street: ALPHA_SPACE,
      city: ALPHA_SPACE,
      zipcode: ALPHA_NUM
    }
  ]
}
// ////////////////////////////////////////////////////////////////////////// //
module.exports = data =>
  Object.keys(schema).reduce((acc, cur) => {
    if (acc === false) return acc
    if (cur in data === false) return false
    for (const key in data) { if (key in schema === false) return false }

    if (Array.isArray(schema[cur])) {
      if (Array.isArray(data[cur]) === false) return false
      const [arraySchema] = schema[cur]
      for (const itemIndex in data[cur]) {
        for (const key in data[cur][itemIndex])
          if (arraySchema[key].test(data[cur][itemIndex][key]) === false)
            return false
      }
    } else if (schema[cur].test(data[cur]) === false) return false
    return acc
  }, true)
