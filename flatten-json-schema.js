function combineProperties (properties, parentPath) {
  var flattenedJsonSchemas = Object
    .keys(properties)
    .map(function (propertyKey) {
      return flattenJsonSchema(
        properties[propertyKey],
        parentPath ? [parentPath, propertyKey].join('.'): propertyKey
      );
    });

  return Array.prototype.concat.apply(
    Array.prototype,
    flattenedJsonSchemas
  );
}

function flattenJsonSchema(jsonSchema, parentPath) {
  var type = jsonSchema.type;

  switch (type) {
    case 'object':
      return combineProperties(
        jsonSchema.properties,
        parentPath
      );

    case 'array':
      return flattenJsonSchema(
        jsonSchema.items,
        parentPath ? [parentPath, '[]'].join('.'): '[]'
      );

    default:
      return [{ path: parentPath, type: type }];
  }
}

module.exports = flattenJsonSchema
