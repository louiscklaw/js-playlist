const name_to_key={
  'hello':'h',
  'apple':'a',
  'h':'hh'
}

const key_to_name=reverseNameToKey(name_to_key)

function reverseNameToKey(name_key_in){
  var output={}
  Object.keys(name_key_in).forEach(name => {
    let key = name_key_in[name]
    output[key] = name
  })

  return output
}

function translateToName(key_in){
  var output = {}
  Object.keys(key_in).forEach( key => {
    output[key_to_name[key]] = key_in[key]
  })
  return output
}

function translateToKey(name_in){
  var output = {}
  Object.keys(name_in).forEach( name => {
    output[name_to_key[name]] = name_in[name]
  })
  return output
}

function translateToKeys(array_names_in){
  console.log(array_names_in)
  return array_names_in.map( x => {
    return translateToKey(x)
  })
}

function translateToNames(array_key_in){
  return array_key_in.map( x => {
    return translateToName(x)
  })
}

module.exports={
  name_to_key,
  key_to_name,
  translateToKey,
  translateToName,
  translateToKeys,
  translateToNames
}