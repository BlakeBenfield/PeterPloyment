const Validator = require('jsonschema').Validator;
const v = new Validator();
const {userSchema, tableSchema, entrySchema} = require('./API_SCHEMAS');

const map = new Map([
    ['user', userSchema],
    ['table', tableSchema],
    ['entry', entrySchema]
]);

const validate = (obj, selector) => {
    if (!obj) return false;
    const schema = map.get(selector);
    if (!schema) throw new Error("Schema type \"" + selector + "\"does not exist!");
    return v.validate(obj, schema).errors.length < 1;
}

module.exports = validate;

