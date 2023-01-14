const { translateToKeys, translateToNames } = require('./db_keys')

var obj_test = { hello: 'travis3' }

var test_array = [{ apple: '123' }, { hello: '456' }, { h: '456' }]

var updated_content = translateToKeys(test_array)

console.log(obj_test)
console.log(updated_content)

console.log(translateToNames(updated_content))
