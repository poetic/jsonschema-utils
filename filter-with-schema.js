function filterWithSchema (origin, jsonSchema) {
  if (typeof origin === 'undefined') {
    return origin
  }

  var type = jsonSchema.type

  if (type === 'object') {
    var properties = jsonSchema.properties
    return Object.keys(origin).reduce(function(obj, key) {
      if (key in properties) {
        var newObj = {}
        newObj[key] = filterWithSchema(origin[key], properties[key])
        Object.assign(obj, newObj)
      }
      return obj
    }, {})
  } else if (type === 'array') {
    var subJsonSchema = jsonSchema.items
    if (!Array.isArray(origin)) {
      throw {
        name: 'not-array',
        message: JSON.stringify(jsonSchema)
      }
    }
    return origin.map(function(item) {
      return filterWithSchema(item, subJsonSchema)
    })
  } else {
    return origin
  }
}

module.exports = filterWithSchema
