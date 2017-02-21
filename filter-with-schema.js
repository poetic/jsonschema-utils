function filterWithSchema (jsonSchema, origin) {
  if (typeof origin === 'undefind') {
    return origin
  }

  var type = jsonSchema.type
  if (!type && jsonSchema.properties) {
    type = 'object'
  }

  if (type === 'object') {
    var properties = jsonSchema.properties
    return Object.keys(origin).reduce(function(obj, key) {
      if (key in properties) {
        var newObj = {}
        newObj[key] = filterWithSchema(properties[key], origin[key])
        Object.assign(obj, newObj)
      }
      return obj
    }, {})
  } else if (type === 'array') {
    var subJsonSchema = jsonSchema.items
    return origin.map(function(item) {
      return filterWithSchema(subJsonSchema, item)
    })
  } else {
    return origin
  }
}

module.exports = filterWithSchema
