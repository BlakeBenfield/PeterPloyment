const Validator = require('jsonschema').Validator;
const v = new Validator();
const {userSchema, tableSchema, entrySchema} = require('API_SCHEMAS');

const map = new Map([
    ['user', userSchema],
    ['table', tableSchema],
    ['entry', entrySchema]
]);

const validate = (obj, selector) => {
    const schema = map.get(selector);
    if (!schema) return throw new Error("Schema type does not exist!");
    return v.validate(obj, schema).valid;
}

module.exports = validate;

